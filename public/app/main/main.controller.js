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
        vm.item = {};

        vm.categories = [
            {name: "Lebensmittel", value: "lebensmittel"},
            {name: "Hygieneartikel", value: "hygieneartikel"}
        ];
        vm.search = {
            amount: 1,
            category: vm.categories[0].value
        };
        vm.result = [];
        vm.top = data.getTop();
        vm.list = data.getList();

        vm.chipClick = function (item) {
            vm.search.object = item;
        };

        vm.post = function(form) {
            vm.submitted = true;

            if(form.$valid) {
                $http.post('/api/items', vm.search).then(function (res) {
                    vm.result = res.data;
                    vm.showResult = true;
                }, function (err) {
                    console.log(err);
                });
            }
        };

        vm.getVendor = function (string) {
          return string.split(": ")[0];
        };

        vm.saveItem = function () {
            data.saveItem(vm.item);
            console.log(vm.result);
        };
        
        
        vm.validate = function () {
            $http.post('/api/validation', vm.search).then(function (res) {
                vm.item = res.data;
            }, function (err) {
                console.log(err);
            });
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