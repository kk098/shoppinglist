'use strict';

angular
    .module('listieMcListface')
    .controller('MainController', MainController);

function MainController($log, $http) {
    $log.debug('MainController loaded');
    var vm = this;

    vm.submitted = false;
    vm.newItem = {};
    vm.searchPara = {};
    vm.unitList = [
        {name: "Stück", value:"stk"},
        {name: "Kilogramm", value:"kg"},
        {name: "Milliliter", value:"ml"},
        {name: "Liter", value:"l"},
        {name: "Pack", value:"p"}
    ];

    vm.post = function(form) {
        vm.submitted = true;

        if(form.$valid) {
            $http.post('/api/items', {searchString: vm.searchPara.name}).then(function(res) {
                $log.debug(res);
                vm.result = res.data;
            });
        }
    }
}