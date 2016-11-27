(function () {

    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            findUserById : findUserById,
            findUserByUserName: findUserByUserName,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout
        };

        return api;

        function logout() {
            return $http.post('/api/logout');
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            }
            return $http.post('/api/login', user);
        }
        
        function checkLogin() {
            return $http.post('/api/checkLogin');
        }

        function createUser(user) {
            var url = '/api/user';
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }

        function findUserByUserName(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' + password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url);
        }

    }


    
})();
