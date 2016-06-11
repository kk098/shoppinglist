angular
    .module('listieMcListface')
    .factory('dataservice', dataservice);

dataservice.$inject = ['$http', '$log'];

function dataservice($http, $log) {
    return {
        getBaseProducts: getBaseProducts
    };

    function getBaseProducts() {
        return ['bill', 'james', 'dingdong'];
        return $http.get('/api/baseproducts')
            .then(getBaseProductsComplete)
            .catch(getBaseProductsFailed);

        function getBaseProductsComplete(response) {
            return response.data.results;
        }

        function getBaseProductsFailed(error) {
            $log.error('XHR Failed for getAvengers.' + error.data);
        }
    }
}