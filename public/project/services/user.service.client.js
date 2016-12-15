(function () {

    angular
        .module("BookedRead")
        .factory("ReaderService", ReaderService);

    function ReaderService($http) {

        var api = {
            createUser: createUser,
            findUserById : findUserById,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout,
            saveToReadingList: saveToReadingList,
            getBooksFromReadingList: getBooksFromReadingList,
            deleteReview: deleteReview
        };

        return api;

        function deleteReview(review) {
            var url = "/api/project/review/" + review._id;
            return $http.delete(url);
        }

        function getBooksFromReadingList(uid) {
            var url = "/api/project/readinglist/" + uid
            return $http.get(url);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            }
            return $http.post('/api/project/login', user);
        }
        
        function checkLogin() {
            return $http.post('/api/project/checkLogin');
        }

        function createUser(user) {
            var url = '/api/project/user';
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = '/api/project/user/' + userId;
            return $http.get(url);
        }

        function findUserByUserName(username) {
            var url = '/api/project/user?username=' + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/project/user?username=' + username + '&password=' + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = '/api/project/user/' + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = '/api/project/user/' + userId;
            return $http.delete(url);
        }

        function saveToReadingList(uid, book) {
            var url = '/api/project/savebook/' + uid;
            return $http.post(url, book);
        }

    }


    
})();
