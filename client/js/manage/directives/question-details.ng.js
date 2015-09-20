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
      $scope.editQuestion = function (question) {
        $scope.editingQuestion = !$scope.editingQuestion;
      };

      $scope.cancel = function(question) {
        $scope.editingQuestion = false;
      };

      $scope.deleteQuestion = function (index) {
        var success = confirm("Are you sure you want to delete this question?")
        if (success) {
          $scope.survey.questions.splice(index, 1);
          $scope.save();
        }
      };

      $scope.save = function(question) {
        $scope.survey.save().then(function(numberOfDocs){
          console.log('save success doc affected ', numberOfDocs);
        }, function(error){
          console.log('save error', error);
        });
      };
    },
    templateUrl: 'client/js/manage/directives/question-details.ng.html',
  };
});
