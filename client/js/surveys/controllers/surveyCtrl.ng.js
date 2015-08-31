angular.module('quick-survey').controller('SurveyCtrl',
  function ($scope, $rootScope, $meteor, $state) {

  $scope.loaded = false;

  $scope.$meteorSubscribe('surveys')
    .then(function() {
      $scope.loaded = true;
      $scope.activeSurvey = $meteor.object(Surveys, {active: true}, false);
      // ToDo, check for the survey's active status.
      $scope.newResponse = {
        'survey': $scope.activeSurvey,
        'questions': angular.copy($scope.activeSurvey.questions)
      };
    });

  $scope.$meteorSubscribe('users')
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
      }, function(error) {
        console.log('error');
      });
  };

});
