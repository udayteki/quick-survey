angular.module('quick-survey').directive('manageSurvey', function () {
  return {
    restrict: 'A',
    scope: {
      survey: '=',
    },
    controller: function ($scope) {

      $scope.toggleAddingQuestion = function() {
        $scope.addingQuestion = !$scope.addingQuestion;
      };

      $scope.deleteQuestion = function (index) {
        $scope.survey.questions.splice(index, 1);
      };
    },
    templateUrl: 'client/js/admin/directives/manage-survey.ng.html',
  };
});
