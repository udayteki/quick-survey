angular.module('quick-survey').directive('editSurveyDetails', function () {
  return {
    restrict: 'A',
    scope: {
      survey: '=',
    },
    controller: function ($scope) {
      $scope.save = function(survey) {
        survey.save();
      };
    },
    templateUrl: 'client/js/admin/directives/edit-survey-details.ng.html',
  };
});
