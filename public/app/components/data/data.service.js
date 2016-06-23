(function () {
    'use strict';

    angular
        .module('listieMcListface')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$log'];

    function dataservice($http, $log) {
        return {
            getSearchables: getSearchables,
            getMatching: getMatching,
            getTop: getTop
        };

        function getSearchables() {
            return $http.get('/api/searchables')
                .then(getComplete)
                .catch(getFailed);

            function getComplete(res) {
                return res.data;
            }

            function getFailed(error) {
                $log.error('XHR Failed for getAvengers.' + error.data);
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
                $log.error('XHR Failed for getAvengers.' + error.data);
            }
        }

        function getTop(string) {
            return $http.get('/api/searchables/' + string)
                .then(getComplete)
                .catch(getFailed);

            function getComplete(res) {
                return res.data;
            }

            function getFailed(error) {
                $log.error('XHR Failed for getAvengers.' + error.data);
            }
        }
    }
})();