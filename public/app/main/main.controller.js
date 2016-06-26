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

        vm.find = function(form) {
            vm.submitted = true;

            if(form.$valid) {
                $http.post('/api/validation', vm.search).then(function (res) {
                    vm.item = res.data;
                    vm.showResult = true;
                }, function (err) {
                    console.log(err);
                });
            }
        };

        vm.saveItem = function () {
            data.saveItem(vm.item);
            console.log(vm.result);
        };

        //TODO: remove when searchable crawler finished
        vm.searchable = {};
        vm.saveSearchable = function (form) {
            vm.submitted2 = true;

            if(form.$valid) {
                vm.searchable.aliases = vm.searchable.aliases.split(',');

                $http.post('/api/searchables', vm.searchable).then(function(res) {
                    $log.debug(res);
                    vm.post = res.data;
                }, function (err) {
                    $log.debug(res);
                });
            }
        };
    }
})();