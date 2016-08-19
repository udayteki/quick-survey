angular.module('quick-survey').directive('questionDetails', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=',
      questionTypes: '=',
      index: '=',
      // TODO: figure out a way to not pass survey through here, just
      // the save() method on survey.
      survey: '='
    },
    controller: function ($scope) {
      $scope.editingQuestion = false;

      $scope.saved = false;

      $scope.editQuestion = function (question) {
        $scope.editingQuestion = !$scope.editingQuestion;
      };

      $scope.cancel = function(question) {
        $scope.editingQuestion = false;
      };

      $scope.deleteQuestion = function (index) {
        var success = confirm("Are you sure you want to delete this question?");
        if (success) {
          $scope.survey.questions.splice(index, 1);
          $scope.save();
        }
      };

      $scope.save = function() {
        $scope.saved = false;
        Surveys.update($scope.survey._id,
          {$set: {
            questions: angular.copy($scope.survey.questions)
          }}, function(err, resp) {
            if (err) {
              console.log('error', err);
            } else {
              $scope.$apply(function () {
                $scope.saved = true;
              });
            }

          });
      };
    },
    templateUrl: 'client/js/manage/directives/question-details.ng.html',
  };
});
