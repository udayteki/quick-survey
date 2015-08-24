angular.module('quick-survey').directive('addQuestion', function () {
  return {
    restrict: 'A',
    scope: {
      survey: '=survey',
    },
    controller: function ($scope) {

      $scope.$watch('survey', function() {
        console.log('survey', $scope.survey);
      });

      $scope.question = {
        'required': false,
      };

      $scope.questionTypes = [
        {'type': 'number'},
        {'type': 'text'},
        {'type': 'textarea'},
        {'type': 'date'}
        // ToDo: Add more question types as the question directive supports them.
      ];

      $scope.question = {
        'type': $scope.questionTypes[0].type
      };

      $scope.addQuestion = function (question) {
        console.log($scope.question);
        $scope.survey.questions.push($scope.question);
        // question.type = question.type.type;
      };
    },
    templateUrl: 'client/js/admin/directives/add-question.ng.html',
  };
});
