
angular.module('quick-survey').controller('AdminCtrl', function ($scope, $meteor, $state, $rootScope) {

  $scope.responses = $meteor.collection(Responses).subscribe('responses');

  $meteor.subscribe('surveys').then(function() {
    $scope.surveys = $meteor.collection(Surveys);

    $scope.activeSurvey = $scope.surveys[0];
  });

  $scope.deleteQuestion = function (index) {
    $scope.activeSurvey.questions.splice(index, 1);
  };
});
