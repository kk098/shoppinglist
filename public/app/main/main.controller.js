'use strict';

angular
    .module('listieMcListface')
    .controller('MainController', MainController);

function MainController($log, $http) {
    $log.debug('MainController loaded');
    var vm = this;

    vm.newItem = {};
    vm.searchString = "";

    vm.post = function() {
        $http.post('/api/items', {searchString: vm.searchString}).then(function(res) {
            $log.debug(res);
            vm.result = res.data;
        });
    }
}