(function () {
    'use strict';
    
    angular
        .module('listieMcListface')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$log', 'dataservice'];

    function MainController($http, $log, dataservice) {
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
                    vm.result = res.data;
                });
            }
        };

        //TODO: remove when searchable crawler finished
        vm.searchable = "";
        vm.postSearchable = function () {
            $http.post('/api/searchables', {name: vm.searchable}).then(function(res) {
                $log.debug(res);
                vm.post = res.data;
            });
        };
    }
})();