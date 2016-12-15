(function () {
    angular.module("BookedRead")
        .controller("SearchController", SearchController)
        .controller("DetailController", DetailController)
    
    function SearchController(SearchService, $sce, $window, $location, ReaderService) {
        var vm = this;
        vm.searchBooks = searchBooks;
        vm.checkSafeIMAGE = checkSafeIMAGE;
        vm.selectBook = selectBook;
        vm.isLoggedIn = isLoggedIn;
        vm.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));

        function isLoggedIn() {
            return vm.currentUser && vm.currentUser != '';
        }

        function searchBooks(searchTerm) {
            SearchService.searchBooks(searchTerm).success(function (response) {
                // var data = response.replace("jsonFlickrApi(" , "");
                // data = data.substring(0, data.length - 1);
                var data = response.items;
                console.log(data);
                vm.books = data;
            })
        }


        function selectBook(book) {
            $window.sessionStorage.setItem("selectedBook",angular.toJson(book));
            $location.url("/book_details")
        }

        function checkSafeIMAGE(url) {
            return $sce.trustAsResourceUrl(url);
        }

        vm.logout = logout;

        function logout() {
            ReaderService.logout()
                .success(function(){
                    $window.localStorage.removeItem("currentUser");
                    vm.currentUser = ''
                });
        }
    }
    
    function DetailController($routeParams, SearchService, $window, $sce, $location, ReaderService) {
        var vm = this;
        vm.searchAuthor = searchAuthor;
        vm.submitReview = submitReview;
        vm.isLoggedIn = isLoggedIn;
        vm.checkSafeHTML = checkSafeHTML;
        vm.isSaved = false;
        vm.saveToReadingList = saveToReadingList;
        vm.deleteFromReadingList = deleteFromReadingList;
        vm.deleteReview = deleteReview;

        function deleteReview(review) {
            ReaderService.deleteReview(review).success(
                function () {
                    getReviews();
                }
            )
        }

        init();
        
        function checkSaved() {
            SearchService.findBookInUserReadingListByIdentity(vm.currentUser._id, vm.book.id).success(
                function (book) {
                    if (book != '0') {
                        vm.isSaved = true;
                    }
                }
            )
        }
        
        function saveToReadingList() {
            if (!isLoggedIn()) {
                $location.url("/login");
                return;
            }
            SearchService.findBookByIdentity(vm.book.id).success(
                function (book) {
                    if (book == '0') {
                        var newBook = {
                            bookIdentity: vm.book.id,
                            name: vm.book.volumeInfo.title,
                            cover: vm.bookImage
                        };
                        SearchService.createBook(newBook).success(
                            function (response) {
                                console.log("new book created!");
                                SearchService.saveBookToReadingList(vm.currentUser._id, response._id).success(
                                    function (response) {
                                        console.log("saved the book!")
                                        vm.isSaved = true;
                                    }
                                )
                            }
                        );
                    } else {
                        SearchService.saveBookToReadingList(vm.currentUser._id, book._id).success(
                            function (response) {
                                console.log("saved the book!")
                                vm.isSaved = true;
                            }
                        )
                    }
                }
            )
        }
        
        function deleteFromReadingList() {
            SearchService.findBookByIdentity(vm.book.id).success(
                function (book) {
                    var bookId = book._id;
                    SearchService.deleteBookFromReadingList(vm.currentUser._id, bookId).success(
                        function (response) {
                            vm.isSaved = false;
                            console.log("sucessfully delete!");
                            // console.log(response);
                        }
                    )
                }
            )

        }

        function searchAuthor() {
            SearchService.searchAuthor(vm.author).success(function (response) {
                // console.log(response);
                vm.authorDetail = response.extract;
                if (vm.authorDetail.length > 350) {
                    vm.authorDetail = vm.authorDetail.substring(0, 350) + "...";
                }

                if (response.thumbnail) {
                    vm.authorImage = response.thumbnail.source;
                }
                // console.log(vm.authorImage)
            })
        }

        function init() {
            vm.book = JSON.parse($window.sessionStorage.getItem("selectedBook"));
            vm.author = vm.book.volumeInfo.authors[0];
            vm.bookImage = vm.book.volumeInfo.imageLinks.thumbnail;
            vm.currentUser = JSON.parse($window.localStorage.getItem("currentUser"));
            if (isLoggedIn()) {
                checkSaved();
            }
            searchAuthor();
            getReviews();
        }
        
        function submitReview() {
            var review = {
                content: vm.userreview,
                _reader: vm.currentUser._id,
                book: vm.book.id
            }

            SearchService.writeReview(review).success(
                function (response) {
                    vm.userreview = ""
                    getReviews();
                }
            )
        }

        function getReviews() {
            var bookId = vm.book.id;
            SearchService.getReviewsByBook(bookId).success(
                function (response) {
                    if (response != '0') {
                        vm.reviews = response;
                    }
                }
            )
        }

        function isLoggedIn() {
            return vm.currentUser && vm.currentUser != '';
        }

        function checkSafeHTML(html) {
            return $sce.trustAsHtml(html);
        }

        vm.logout = logout;

        function logout() {
            ReaderService.logout()
                .success(function(){
                    $window.localStorage.removeItem("currentUser");
                    vm.currentUser = ''
                });
        }
    }

})();

