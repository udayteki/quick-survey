angular.module("quick-survey").controller("RegisterCtrl",
  function ($meteor, $state) {
    var vm = this;

    vm.credentials = {
      email: '',
      password: ''
    };

    vm.error = '';

    vm.register = function () {
      $meteor.createUser(vm.credentials).then(
        function (response) {
          console.log(vm.currentUser);
          vm.success = true;
        },
        function (err) {
          if (err.error === 'account-created') $state.go('register-success')
          vm.error = err;
        }
      );
    };
  }
);

