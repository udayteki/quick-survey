
angular.module('quick-survey').controller('NavBarCtrl',
  function ($scope, $meteor, $state, $rootScope) {
    $scope.$watch('currentUser', function() {
      if ($rootScope.currentUser) {
        $scope.user = $meteor.object(Meteor.users, $rootScope.currentUser._id, false).subscribe('users');
        $scope.is_admin = $scope.user.is_admin;
      } else {
        $scope.is_admin = false;
      }
    });
  });
