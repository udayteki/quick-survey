angular.module('quick-survey').controller('QuestionListCtrl', [
  '$scope', '$rootScope', '$meteor',
  function ($scope, $rootScope, $meteor) {

  $scope.loaded = false;

  $meteor.subscribe('questions').then(function(subscriptionHandle) {
    $scope.questions = $meteor.collection(Questions);

    $scope.newResponse = {
      'questions': angular.copy($scope.questions)
    };
  });

  $scope.responses = $meteor.collection(Responses);

  $scope.$watch('currentUser', function() {
    if ($rootScope.currentUser) {
      $scope.loaded = true;
      $scope.user = $meteor.object(Meteor.users, $rootScope.currentUser._id, false).subscribe('users');
    }
  });

  $scope.responses = $meteor.collection(Responses);

  $scope.submit = function(newResponse) {
    newResponse.user = $rootScope.currentUser._id;
    $scope.responses.save(newResponse)
      .then(function(result) {
        $scope.user.has_submitted = true;
        $scope.user.save();
      });
  };

}]);
