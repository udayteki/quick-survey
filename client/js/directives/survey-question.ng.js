angular.module('quick-survey').directive('surveyQuestion', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=surveyQuestion',
    },
    controller: function ($scope) {
      // TODO
    },
    templateUrl: 'client/js/directives/survey-question.ng.html',
  };
});
