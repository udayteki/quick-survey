
angular.module('quick-survey').controller('ManageCtrl',
  function ($scope, $reactive, $state, $rootScope, activeSurvey, responses) {

  $scope.$state = $state;
  $scope.activeSurveyId = activeSurvey ? activeSurvey._id : null;

  $scope.helpers({
    responses: function() {
      return Responses.find({});
    },
    activeSurvey: function() {
      if ($scope.activeSurveyId) {
        var survey = Surveys.findOne($scope.activeSurveyId);
        return survey;
      }
    }
  });

  $scope.exportAllResponses = function() {
    var self = this;
    Meteor.call("exportAllResponses", function(error, data) {

      if ( error ) {
        alert(error);
        return false;
      }
      var csvContent = '';
      // var csvContent = "data:text/csv;charset=utf-8,";

      csvContent += data.fields.join(',') + '\n';

      data.data.forEach(function(result, index){
         var dataString = result.join(",");
         csvContent += index < data.data.length ? dataString+ "\n" : dataString;
      });

      self._downloadCSV(csvContent);
      // var csv = Papa.unparse(data);
      // self._downloadCSV(csv);
    });
  };

  $scope._downloadCSV = function(csv) {
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    a.download = "responses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  $scope.sendTestEmail = function() {
    Meteor.call('sendEmail',
            $scope.currentUser.emails[0].address,
            $scope.currentUser.emails[0].address,
            'Hello from Meteor!',
            'This is a test of Email.send.');
  };

  $scope.clearResults = function() {
    var success = confirm("This will remove all results so far, are you sure?");
    if (success) {
      Meteor.call('resetResponses');
    }
  };

  $scope.resetUsers = function() {
    var success = confirm("This will set all users to not completed the survey");
    if (success) {
      Meteor.call('resetUsers', function(err) {
        if (err) console.log('error', err);
        Session.setPersistent('has_submitted', 0);
      });
    }
  };
});
