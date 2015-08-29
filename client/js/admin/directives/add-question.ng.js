angular.module('quick-survey').directive('addQuestion', function () {
  return {
    restrict: 'A',
    scope: {
      // TODO: figure out a way to not pass survey through here, just
      // the save() method on survey as well as just the questions
      // array.
      survey: '=',
      addingQuestion: '=',
      questionTypes: '=',
    },
    controller: function ($scope) {

      $scope.question = {
        'required': false,
      };

      $scope.question = {
        'type': $scope.questionTypes[0].type
      };

      $scope.addQuestion = function (question) {
        $scope.survey.questions.push(question);
        $scope.question = {
          'required': false,
        };
        $scope.survey.save();
      };
    },
    templateUrl: 'client/js/admin/directives/add-question.ng.html',
  };
});
