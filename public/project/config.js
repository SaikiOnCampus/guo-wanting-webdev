(function () {
    angular.module("BookedRead")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home-page2.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/book/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/book_details", {
                templateUrl: "views/book/book-detail.view.client.html",
                controller: "DetailController",
                controllerAs: "model"
            })
            .when("/favorites", {
                templateUrl: "views/user/favorite.view.client.html",
                controller: "FavoriteController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: '/home'
            });

        function checkLogin($q, ReaderService, $location) {
            var deferred = $q.defer();
            ReaderService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            console.log("resolved!")
                            deferred.resolve();
                        } else {
                            console.log("not resolved!")
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }

    }

})();