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
            // data.save();
          console.log(vm.result);
        };
        
        
        vm.validate = function () {
            var data = { amount: 1,
                category: 'lebensmittel',
                object: {
                    label: 'Milch',
                    value: {
                        _id: '576518c982c5da5c4ad9a09a',
                        name: 'Milch',
                        __v: 0,
                        aliases: [],
                        category: 'uncategorized'
                    }
                }
            };


            $http.post('/api/validation', vm.search).then(function (res) {
                console.log(res.data);
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