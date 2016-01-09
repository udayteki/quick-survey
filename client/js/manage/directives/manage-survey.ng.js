angular.module('quick-survey').directive('manageSurvey', function () {
  return {
    restrict: 'A',
    scope: {
      survey: '='
    },
    controller: function ($scope) {

      $scope.questionTypes = [
        {'type': 'number'},
        {'type': 'text'},
        {'type': 'textarea'},
        {'type': 'radio'},
        {'type': 'checkbox'},
        {'type': 'date'}
        // ToDo: Add more question types as the question directive supports them.
      ];

    },
    templateUrl: 'client/js/manage/directives/manage-survey.ng.html',
  };
});
