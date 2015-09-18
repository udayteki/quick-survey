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

    if (site.has_been_set_up === undefined &&
      !$rootScope.currentUser &&
      !$rootScope.loggingIn) {
      $state.go('setup');
    }
  });

  $scope.has_submitted = Session.get('has_submitted');
  console.log($scope.has_submitted);

  $scope.responses = $meteor.collection(Responses);

  $scope.submit = function(newResponse) {
    newResponse.questions.forEach(function(question) {
      if (question.type === 'checkbox') {
        question.options.forEach(function(opt) {
          if (opt.type === 'other' &&
              opt.value !== '' &&
              opt.value !== undefined) {
            question.answer.push(opt.value);
          }
        });
      } else if (question.type === 'radio') {
        question.answer = question.answer.value;
      }
    });
    if ($scope.activeSurvey.require_sign_in) {
      newResponse.user = $rootScope.currentUser._id;
    }
    $scope.responses.save(newResponse)
      .then(function(result) {
        console.log($scope.activeSurvey);
        if ($scope.activeSurvey.require_sign_in) {
          $scope.user = $meteor.object(Meteor.users,
                                     $rootScope.currentUser._id,
                                     false).subscribe('users');
          $scope.user.has_submitted = true;
          $scope.user.save();
        }
        Session.setPersistent('has_submitted', true);
        console.log(Session.get('has_submitted'));
      }, function(error) {
        console.log('error');
      });
  };

});
