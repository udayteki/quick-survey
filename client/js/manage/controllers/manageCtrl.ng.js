
angular.module('quick-survey').controller('ManageCtrl',
  function ($scope, $meteor, $state, $rootScope) {

  $scope.$state = $state;

  $scope.$meteorSubscribe('responses').then(function() {
    $scope.responses = $meteor.collection(Responses);
  });

  $scope.$meteorSubscribe('surveys').then(function() {
    $scope.activeSurvey = $meteor.object(Surveys, {active: true}, false);
  });

  $scope.exportAllResponses = function() {
    var self = this;
    Meteor.call("exportAllResponses", function(error, data) {

      if ( error ) {
        alert(error);
        return false;
      }

      var csv = Papa.unparse(data);
      self._downloadCSV(csv);
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
      $scope.responses.remove();
    }
  };

  $scope.resetUsers = function() {
    var success = confirm("This will set all users to not completed the survey");
    if (success) {
      $scope.$meteorSubscribe('users').then(function() {
        $scope.users = $meteor.collection(Meteor.users);

        $scope.users.forEach(function(user) {
          var fetchedUser = $meteor.object(Meteor.users, user._id, false);
          fetchedUser = fetchedUser.subscribe('users');
          fetchedUser.has_submitted = false;
          fetchedUser.save();
        });
      });
    }
  };
});
