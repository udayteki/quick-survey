
angular.module('quick-survey').controller('AdminCtrl', ['$scope', '$meteor', '$state', '$rootScope', function ($scope, $meteor, $state, $rootScope) {
  console.log('admin loaded');
  $scope.responses = $meteor.collection(Responses).subscribe('responses');

  $scope.watch('currentUser', function() {
    // ToDO: this doesn't really seem to do anything.
    if ($rootScope.currentUser === undefined) {
      $state.go('questions');
    }
  });
}]);
