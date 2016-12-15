(function () {
    angular.module("BookedRead")
        .factory("SearchService", SearchService);

    function SearchService($http) {
        var api = {
            searchBooks : searchBooks,
            searchAuthor: searchAuthor,
            writeReview: writeReview,
            getReviewsByBook: getReviewsByBook,
            saveBookToReadingList: saveBookToReadingList,
            createBook: createBook,
            findBookInUserReadingListByIdentity: findBookInUserReadingListByIdentity,
            deleteBookFromReadingList: deleteBookFromReadingList,
            findBookByIdentity: findBookByIdentity
        };

        return api;

        function searchBooks(searchTerm) {
            var key = "";
            var secret = "";
            var terms = searchTerm.split(" ");
            var term = terms.join("+");
            var url = "https://www.googleapis.com/books/v1/volumes?q=" + term + "&maxResults=18";

            return $http.get(url);
        }

        function searchAuthor(searchTerm) {
            var terms = searchTerm.split(" ");
            var term = terms.join("_");
            var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + term;
            return $http.get(url)
        }

        function writeReview(review) {
            console.log("I am in service");
            console.log(review);
            var url = '/api/project/review';
            return $http.post(url, review)
        }
        
        function getReviewsByBook(bookId) {
            var url = '/api/project/reviews/' + bookId;
            return $http.get(url);
        }

        function saveBookToReadingList(uid, bookId) {
            var id = {_id: bookId}
            var url = '/api/project/savebook/' + uid;
            return $http.post(url, id);
        }
        
        function createBook(book) {
            var url = "/api/project/book";
            return $http.post(url, book);
        }

        function findBookByIdentity(bidt) {
            var url = "/api/project/book/" + bidt;
            return $http.get(url);
        }

        function findBookInUserReadingListByIdentity(uid, bookIdentity) {
            console.log("findBookInUserReadingListByIdentity");
            console.log(bookIdentity);
            var url = "/api/project/readinglist/" + uid + "/book/" + bookIdentity;
            return $http.get(url);
        }

        function deleteBookFromReadingList(uid, bid) {
            var url = "/api/project/deletebook/" + uid + "/book/" + bid;
            return $http.delete(url);
        }

    }

})();
