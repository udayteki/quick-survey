angular.module('quick-survey').directive('survey-question', function () {
  return {
    restrict: 'EA',
    scope: {
      question: '&',
    },
    controller: function ($scope) {
      console.log('survey question loaded');
    },
    templateUrl: 'client/js/directives/survey-question.ng.html',
  };
});
