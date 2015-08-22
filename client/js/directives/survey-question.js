angular.module('quick-survey').directive('surveyQuestion', [function () {
  return {
    restrict: 'A',
    scope: {
      question: '=surveyQuestion',
    },
    controller: function ($scope) {
      console.log($scope);
      console.log('survey question loaded');
    },
    templateUrl: 'client/js/directives/survey-question.ng.html',
  };
}]);
