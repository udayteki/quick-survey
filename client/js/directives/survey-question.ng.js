angular.module('quick-survey').directive('surveyQuestion', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=surveyQuestion',
    },
    controller: function ($scope) {
      $scope.other = '';
      $scope.choosingOther = false;
      $scope.optionChanged = function (option) {
        if (option.type != 'other') {
          $scope.other = '';
          $scope.choosingOther = false;
        } else {
          $scope.choosingOther = true;
        }
      };

      $scope.changeOption = function(option){
        $scope.optionChanged();
      };
    },
    templateUrl: 'client/js/directives/survey-question.ng.html',
  };
});
