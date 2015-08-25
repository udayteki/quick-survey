angular.module('quick-survey').controller('SurveyCtrl',
  function ($scope, $rootScope, $meteor, $state) {

  $scope.loaded = false;

  $meteor.subscribe('surveys').then(function(subscriptionHandle) {
    $scope.activeSurvey = $meteor.collection(Surveys)[0];
    // ToDo, check for the survey's active status.
    $scope.newResponse = {
      'survey': $scope.activeSurvey,
      'questions': angular.copy($scope.activeSurvey.questions)
    };
  });

  $meteor.subscribe('users')
    .then(function(){
      if (!$rootScope.has_been_set_up &&
        !$rootScope.currentUser &&
        !$rootScope.loggingIn) {
        $state.go('setup');
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

});
