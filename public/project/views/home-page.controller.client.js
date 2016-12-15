(function () {
    angular.module("BookedRead")
        .controller("HomePageController", HomePageController)

    
    function HomePageController($window, ReaderService, $location) {
        var vm = this;
        // console.log($rootScope.user);
        vm.user = JSON.parse($window.localStorage.getItem("currentUser"));

        vm.isLoggedIn = isLoggedIn;

        function isLoggedIn() {
            return vm.user && vm.user != '';
            // return true;
        }

        vm.logout = logout;

        function logout() {
            ReaderService.logout()
                .success(function(){
                    $window.localStorage.removeItem("currentUser");
                    vm.user = ''
                });
        }

        vm.navigate = navigate;

        function navigate() {
            if (isLoggedIn()) {
                $location.url("/user/" + vm.user._id)
            } else {
                $location.url("/login");
            }
        }
    }
    
})();
