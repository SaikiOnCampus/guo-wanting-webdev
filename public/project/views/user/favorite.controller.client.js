(function () {
    angular.module("BookedRead")
        .controller("FavoriteController", FavoriteController)

    function FavoriteController($window, ReaderService, $sce, $location, SearchService) {
        var vm = this;
        vm.isEmpty = true;

        vm.getReadingList = getReadingList;

        vm.removeFromList = removeFromList;

        function removeFromList(dBook) {
            SearchService.deleteBookFromReadingList(vm.currentUser._id, dBook._id).success(
                function (response) {
                    getReadingList()
                }
            )
        }


        function init() {
            vm.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
            getReadingList();
        }

        init();

        function getReadingList() {
            if (isLoggedIn()) {
                ReaderService.getBooksFromReadingList(vm.currentUser._id).success(
                    function (books) {
                        vm.readingList = books
                        if (books.length > 0) {
                            vm.isEmpty = false;
                        }
                    }
                )
            } else {
                $location.url("/login")
            }
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

        vm.isLoggedIn = isLoggedIn;
        vm.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));

        function isLoggedIn() {
            return vm.currentUser && vm.currentUser != '';
        }

        vm.checkSafeIMAGE = checkSafeIMAGE

        function checkSafeIMAGE(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }

})();
