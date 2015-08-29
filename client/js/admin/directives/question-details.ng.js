angular.module('quick-survey').directive('questionDetails', function () {
  return {
    restrict: 'A',
    scope: {
      question: '=',
      questionTypes: '=',
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

      $scope.save = function(question) {
        $scope.survey.save().then(function(numberOfDocs){
          console.log('save success doc affected ', numberOfDocs);
        }, function(error){
          console.log('save error', error);
        });
      };
    },
    templateUrl: 'client/js/admin/directives/question-details.ng.html',
  };
});
