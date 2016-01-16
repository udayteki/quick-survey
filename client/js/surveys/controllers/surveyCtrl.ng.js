angular.module('quick-survey').controller('SurveyCtrl',
  function ($scope, $q, $rootScope, $meteor, $state, $auth) {
  $scope.loaded = false;

  $scope.$state = $state;

  $scope.helpers({
    activeSurvey: function() {
      var surveys = Surveys.find({active: true}).fetch()
      if (surveys.length > 0) {
        var survey = Surveys.findOne(surveys[0]._id);
        if (survey.questions.length > 0) {
          return survey;
        } else {
          console.log('there are no questions')
          $auth.waitForUser().then(function() {
            Meteor.call('isAdmin', function(err, isAdmin){
              console.log('in survey: is admin?', resp)
              $scope.$apply(function() {
                console.log('applying')
                if (isAdmin) $state.go('manage');
              })
            })
          })

        }

      } else {
        $state.go('manage');
        return null;
      }
    }
  });

  $scope.newResponse = {
    'survey': $scope.activeSurvey,
    'questions': $scope.activeSurvey ? angular.copy($scope.activeSurvey.questions) : []
  };

  $scope.loaded = true;

  // $meteor.session('has_submitted').bind($scope, 'has_submitted');

  $scope.has_submitted = Session.get('has_submitted');

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

    Meteor.call('submitResponse', angular.copy(newResponse), function(err, id) {
      $scope.$apply(function() {
        $scope.has_submitted = true;
      });
      Session.setPersistent('has_submitted', 1);
      $state.go('submitted')
    });
  };

});
