
angular.module('quick-survey').controller('AdminCtrl', function ($scope, $meteor, $state, $rootScope) {

  $scope.$state = $state;

  $scope.responses = $meteor.collection(Responses).subscribe('responses');

  $scope.$meteorSubscribe('surveys').then(function() {
    $scope.activeSurvey = $meteor.object(Surveys, {active: true}, false);
  });
});
