angular.module('quick-survey').directive('addRadioQuestionOptions', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=question',
    },
    controller: function ($scope) {
      $scope.question.options = [{
          'value': '',
          'type': 'normal'
        }]
      $scope.addOption = function() {
        $scope.question.options.push({
          'value': '',
          'type': 'normal'
        });
      };
      $scope.addOther = function() {
        $scope.question.options.push({
          'type': 'other'
        });
      };
    },
    templateUrl: 'client/js/admin/directives/add-radio-question-options.ng.html',
  };
});
