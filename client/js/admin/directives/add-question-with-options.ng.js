angular.module('quick-survey').directive('addQuestionWithOptions', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=question',
      existingOptions: '='
    },
    controller: function ($scope) {
      console.log('loaded');
      if (!$scope.existingOptions) {
        $scope.question.options = [{
          'value': '',
          'type': 'normal'
        }];
      }

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
    templateUrl: 'client/js/admin/directives/add-question-with-options.ng.html',
  };
});
