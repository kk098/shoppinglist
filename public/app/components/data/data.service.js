(function () {
    'use strict';

    angular
        .module('listieMcListface')
        .factory('data', dataservice);

    dataservice.$inject = ['$http', '$log', '$q'];

    function dataservice($http, $log, $q) {
        return {
            getSearchables: getSearchables,
            getMatching: getMatching,
            getTop: getTop,
            getList: getList,
            saveItem: saveItem,
            deleteItem: deleteItem
        };

        function getSearchables() {
            return $http.get('/api/searchables')
                .then(getComplete)
                .catch(getFailed);

            function getComplete(res) {
                return res.data;
            }

            function getFailed(error) {
                $log.error('XHR Failed for getSearchables.' + error.data);
            }
        }

        function getMatching(string) {
            var defer = $q.defer();

            $http.get('/api/caches/match/' + string).then(function (res) {
                if (res.data.length > 0) {
                    return $http.get('/api/caches/match/' + string)
                        .then(getComplete)
                        .catch(getFailed);
                } else {
                    return $http.get('/api/searchables/' + string)
                        .then(getComplete)
                        .catch(getFailed);
                }
            });

            console.log(defer);

            return defer.promise;

            // return $http.get('/api/searchables/' + string)
            //     .then(getComplete)
            //     .catch(getFailed);

            function getComplete(res) {
                return defer.resolve(res.data);
                // return res.data;
            }

            function getFailed(error) {
                $log.error('XHR Failed for getMatching.' + error.data);
            }
        }

        function getList() {
            return $http.get('/api/items/')
                .then(getComplete)
                .catch(getFailed);

            function getComplete(res) {
                return res.data;
            }

            function getFailed(error) {
                $log.error('XHR Failed for getList.' + error.data);
            }
        }

        function getTop() {
            return [
                {count: 3, name: "Milch"},
                {count: 32, name: "Kartoffeln"},
                {count: 2, name: "Bier"},
                {count: 6, name: "Brot"},
                {count: 9, name: "Mandeln"},
                {count: 3, name: "Milch"},
                {count: 32, name: "Kartoffeln"},
                {count: 2, name: "Bier"},
                {count: 6, name: "Brot"},
                {count: 9, name: "Mandeln"},
                {count: 2, name: "Apfel"},
                {count: 7, name: "Dings"},
                {count: 33, name: "Uran"}
            ];
            return $http.get('/api/items/top')
                .then(getComplete)
                .catch(getFailed);

            function getComplete(res) {
                return res.data;
            }

            function getFailed(error) {
                $log.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function saveItem(item) {
            return $http.post('/api/items/', item)
                .then(saveComplete)
                .catch(saveFailed);

            function saveComplete(res) {
                return res.data;
            }

            function saveFailed(error) {
                $log.error('XHR Failed for saveItem.' + error.data);
            }
        }

        function deleteItem(item) {
            return $http.delete('/api/items/' + item._id)
                .then(deleteComplete)
                .catch(deleteFailed);

            function deleteComplete(res) {
                return res.data;
            }

            function deleteFailed(error) {
                $log.error('XHR Failed for deleteItem.' + error.data);
            }
        }
    }
})();