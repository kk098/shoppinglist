(function () {
    'use strict';
    
    angular
        .module('listieMcListface')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$log', 'data'];

    function MainController($http, $log, data) {
        $log.debug('MainController loaded');
        var vm = this;

        vm.submitted = false;
        vm.showResult = false;
        vm.newItem = {};
        vm.searchPara = {
            amount: 1,
            unit: "stk"
        };
        vm.unitList = [
            {name: "Stück", value:"stk"},
            {name: "Kilogramm", value:"kg"},
            {name: "Milliliter", value:"ml"},
            {name: "Liter", value:"l"},
            {name: "Pack", value:"p"}
        ];
        vm.result = [];
        vm.top = data.getTop();

        vm.chipClick = function (item) {
            vm.searchPara.name = item.name;
        };

        vm.post = function(form) {
            vm.submitted = true;

            if(form.$valid) {
                $http.post('/api/items', {searchString: vm.searchPara.name}).then(function(res) {
                    vm.result = res.data;
                    vm.showResult = true;
                });
            }
        };

        vm.getVendor = function (string) {
          return string.split(": ")[0];
        };

        vm.saveItem = function () {
          console.log(vm.result);
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