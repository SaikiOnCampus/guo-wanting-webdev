(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(user) {
            if (!user || !user.username) {
                vm.alert = "Please enter your username.";
                return;
            }
            if (!user.password) {
                vm.alert = "Please enter your password.";
                return;
            }
            var promise = UserService.login(user.username, user.password);
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
                    vm.alert = "Sorry, please try again."
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
    
    function ProfileController($routeParams, UserService, $location) {
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
        
        vm.logout = logout;
        
        function logout() {
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });

            // UserService.logout().success(function (status) {
            //     console.log("logged out!")
            //     $location.url('/login');
            // })
        }
    }
    
})();
