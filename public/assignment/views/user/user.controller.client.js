(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController() {
        var vm = this;
    }
    
    function RegisterController() {
        var vm = this;
    }
    
    function ProfileController($routeParams, UserServices) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.user = UserServices.findUserById(vm.userId)
        }
        init();
    }
    
})();
