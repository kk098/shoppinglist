(function () {
    'use strict';

})();

angular
    .module('listieMcListface')
    .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$log'];

function dataservice($http, $log) {
    return {
        getSearchables: getSearchables,
        getMatching: getMatching
    };

    function getSearchables() {
        return $http.get('/api/searchables')
            .then(getSearchablesComplete)
            .catch(getSearchablesFailed);

        function getSearchablesComplete(res) {
            return res.data;
        }

        function getSearchablesFailed(error) {
            $log.error('XHR Failed for getAvengers.' + error.data);
        }
    }
    
    function getMatching(string) {
        return $http.get('/api/searchables/' + string)
            .then(getMatchingComplete)
            .catch(getMatchingFailed);

        function getMatchingComplete(res) {
            return res.data;
        }

        function getMatchingFailed(error) {
            $log.error('XHR Failed for getAvengers.' + error.data);
        }
    }
}