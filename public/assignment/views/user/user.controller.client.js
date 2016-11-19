(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(
                function (user) {
                    console.log(user);
                    if (user != '0') {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.alert = "Unable to locate your credentials!"
                    }
                })
                .error(function (error) {
                    vm.alert = "Error!"
                });
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register() {
            if (vm.user.password != vm.verifyPassword) {
                vm.alert = "Password doesn't match!";
                return;
            }
            UserService.findUserByUserName(vm.user.username).success(function (user) {
                if (user) {
                    console.log(user);
                    vm.alert = "This username has been used!";
                } else {
                    UserService.createUser(vm.user).success(function (user) {
                        if (user != '0') {
                            $location.url("/user/" + user._id);
                        }
                    });
                }
            });

        }

    }
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                if (user != '0') {
                    vm.user = user;
                }
            })
        }
        init();

        vm.updateProfile = updateProfile;

        function updateProfile() {
            UserService.updateUser(userId, vm.user).success(function (status) {
                // if (user != '0') {
                //     vm.user = user;
                // }
            })
        }
    }
    
})();
