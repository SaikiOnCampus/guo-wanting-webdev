(function () {
    angular.module("BookedRead")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, ReaderService, $window) {
        var vm = this;
        vm.login = login;
        vm.isLoggedIn = isLoggedIn;
        vm.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));

        function login(user) {
            // var promise = UserService.findUserByCredentials(user.username, user.password);
            var promise = ReaderService.login(user.username, user.password);
            promise
                .success(
                    function (userObj) {
                        console.log("the return user is ");
                        console.log(userObj)
                        if (userObj != '0') {
                            console.log("log in!");
                            $window.localStorage.setItem("currentUser", angular.toJson(userObj));
                            $location.url("/user/" + userObj._id);
                        } else {
                            vm.alert = "Unable to locate your credentials!"
                        }
                    })
                .error(function (error) {
                    vm.alert = error
                });
        }

        function isLoggedIn() {
            return vm.currentUser && vm.currentUser != '';
        }

        vm.logout = logout;

        function logout() {
            ReaderService.logout()
                .success(function(){
                    $window.localStorage.removeItem("currentUser");
                    vm.currentUser = '';
                    $location.url("/login");
                });
        }
    }
    
    function RegisterController($location, ReaderService, $window) {


        var vm = this;
        vm.register = register;

        function register() {
            if (vm.user.password != vm.verifyPassword) {
                vm.alert = "Password doesn't match!";
                return;
            }
            ReaderService.findUserByUserName(vm.user.username).success(function (user) {
                if (user) {
                    console.log(user);
                    vm.alert = "This username has been used!";
                } else {
                    ReaderService.createUser(vm.user).success(function (user) {
                        if (user != '0') {
                            $location.url("/user/" + user._id);
                        }
                    });
                }
            });

        }

        vm.isLoggedIn = isLoggedIn;
        vm.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));

        function isLoggedIn() {
            return vm.currentUser && vm.currentUser != '';
        }

        vm.logout = logout;

        function logout() {
            ReaderService.logout()
                .success(function(){
                    $window.localStorage.removeItem("currentUser");
                    vm.currentUser = ''
                    $location.url("/login");
                });
        }

    }
    
    function ProfileController($routeParams, ReaderService, $location, $window) {
    //    $routeParams, UserService, $location

        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            var promise = ReaderService.findUserById(userId);
            promise.success(function (user) {
                if (user != '0') {
                    vm.user = user;
                }
            })
        }
        init();

        vm.updateProfile = updateProfile;

        function updateProfile() {
            ReaderService.updateUser(userId, vm.user).success(function (status) {
                // if (user != '0') {
                //     vm.user = user;
                // }
            })
        }

        vm.logout = logout;

        function logout() {
            ReaderService.logout()
                .success(function(){
                    $window.localStorage.removeItem("currentUser");
                    vm.currentUser = ''
                    $location.url("/login");
                });
        }

        vm.isLoggedIn = isLoggedIn;
        vm.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));

        function isLoggedIn() {
            return vm.currentUser && vm.currentUser != '';
        }
    }
    
})();
