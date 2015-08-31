
angular.module('quick-survey').controller('AdminCtrl', function ($scope, $meteor, $state, $rootScope) {

  $scope.$state = $state;

  $scope.$meteorSubscribe('responses').then(function() {
    $scope.responses = $meteor.collection(Responses);
  });

  $scope.$meteorSubscribe('surveys').then(function() {
    $scope.activeSurvey = $meteor.object(Surveys, {active: true}, false);
  });

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
          var user = $meteor.object(Meteor.users, user._id, false).subscribe('users');
          user.has_submitted = false;
          user.save();
          console.log(user);
        });
      });
    }
  };
});
