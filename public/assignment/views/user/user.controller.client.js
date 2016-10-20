(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to locate your credentials!";
            }
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register() {
            if (vm.user.password != vm.verifyPassword) {
                vm.alert = "Password doesn't match!"
                return;
            }
            var user = UserService.findUserByUserName(vm.user.username);
            if (user != null) {
                vm.alert = "This username has been used!"
            } else {
                vm.user = UserService.createUser(vm.user);
                $location.url("/user/" + vm.user._id);
            }
        }


    }
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        function init() {
            vm.user = UserService.findUserById(userId);
        }
        init();
    }
    
})();
