angular.module('quick-survey').directive('addQuestion', function () {
  return {
    restrict: 'A',
    scope: {
      survey: '=',
      addingQuestion: '='
    },
    controller: function ($scope) {

      $scope.question = {
        'required': false,
      };

      $scope.questionTypes = [
        {'type': 'number'},
        {'type': 'text'},
        {'type': 'textarea'},
        {'type': 'radio'},
        {'type': 'date'}
        // ToDo: Add more question types as the question directive supports them.
      ];

      $scope.question = {
        'type': $scope.questionTypes[0].type
      };

      $scope.addQuestion = function (question) {
        $scope.survey.questions.push(question);
        $scope.question = {
          'required': false,
        };
      };
    },
    templateUrl: 'client/js/admin/directives/add-question.ng.html',
  };
});
