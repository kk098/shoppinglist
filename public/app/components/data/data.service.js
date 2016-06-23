(function () {
    'use strict';

    angular
        .module('listieMcListface')
        .factory('data', dataservice);

    dataservice.$inject = ['$http', '$log'];

    function dataservice($http, $log) {
        return {
            getSearchables: getSearchables,
            getMatching: getMatching,
            getTop: getTop,
            getList: getList,
            saveItem: saveItem
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
            return $http.get('/api/searchables/' + string)
                .then(getComplete)
                .catch(getFailed);

            function getComplete(res) {
                return res.data;
            }

            function getFailed(error) {
                $log.error('XHR Failed for getMatching.' + error.data);
            }
        }

        function getList() {
            return $http.get('/api/items/', {
                params: {status: 1}
            })
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
    }
})();