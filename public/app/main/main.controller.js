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
        vm.top = [
            {count: 3, name: "Milch"},
            {count: 32, name: "Kartoffeln"},
            {count: 2, name: "Bier"},
            {count: 6, name: "Brot"},
            {count: 9, name: "Mandeln"},
            {count: 2, name: "Apfel"},
            {count: 7, name: "Dings"},
            {count: 33, name: "Uran"}
        ];

        vm.post = function(form) {
            vm.submitted = true;

            if(form.$valid) {
                $http.post('/api/items', {searchString: vm.searchPara.name}).then(function(res) {
                    vm.result = res.data;
                });
            }
        };

        vm.getVendor = function (string) {
          return string.split(": ")[0];
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