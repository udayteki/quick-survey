angular.module('quick-survey').directive('surveyQuestion',
  function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      question: '=surveyQuestion',
    },
    controller: function ($scope) {
      // Do we even need a controller here?
    },
    templateUrl: 'client/js/directives/survey-question.ng.html',
  };
});
