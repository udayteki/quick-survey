
angular.module('quick-survey').controller('NavBarCtrl', [
  '$scope', '$state', '$rootScope',
  function ($scope, $state, $rootScope) {
    $scope.$watch('currentUser', function() {
      if ($rootScope.currentUser) {
        $scope.is_admin = $rootScope.currentUser.emails[0].address === 'admin@admin.com'
      } else {
        $scope.is_admin = false;
      }
    });
  }]);
