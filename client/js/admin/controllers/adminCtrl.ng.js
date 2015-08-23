
angular.module('quick-survey').controller('AdminCtrl', function ($scope, $meteor, $state, $rootScope) {

  $scope.responses = $meteor.collection(Responses).subscribe('responses');

});
