angular.module('quick-survey').controller('SurveyCtrl',
  function ($scope, $q, $rootScope, $meteor, $state) {
  $scope.loaded = false;

  $q.all([
    $scope.$meteorSubscribe('surveys'),
    $scope.$meteorSubscribe('users'),
    $scope.$meteorSubscribe('sites'),
    ])
  .then(function(responses) {
    $scope.loaded = true;
    $scope.activeSurvey = $meteor.object(Surveys, {active: true}, false);
    // ToDo, check for the survey's active status.
    $scope.newResponse = {
      'survey': $scope.activeSurvey,
      'questions': angular.copy($scope.activeSurvey.questions)
    };

    var site = $meteor.object(Sites, {has_been_set_up: true}, false);
    console.log(site);
    if (site.has_been_set_up === undefined &&
      !$rootScope.currentUser &&
      !$rootScope.loggingIn) {
      $state.go('setup');
    }
  });

  $scope.has_submitted = Session.get('has_submitted');

  $scope.responses = $meteor.collection(Responses);

  $scope.submit = function(newResponse) {
    newResponse.user = $rootScope.currentUser._id;
    $scope.responses.save(newResponse)
      .then(function(result) {
        $scope.user = $meteor.object(Meteor.users,
                                     $rootScope.currentUser._id,
                                     false).subscribe('users');
        $scope.user.has_submitted = true;
        $scope.user.save();
        Session.set('has_submitted', true);
      }, function(error) {
        console.log('error');
      });
  };

});
