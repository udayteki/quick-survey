
angular.module('quick-survey').controller('NavBarCtrl',
  function ($scope, $meteor, $state, $rootScope) {
    $scope.state = $state;
    $scope.$watch('currentUser', function() {
      if ($rootScope.currentUser) {
        $scope.is_admin = $scope.currentUser.is_admin;
      } else {
        $scope.is_admin = false;
      }
    });
  });
