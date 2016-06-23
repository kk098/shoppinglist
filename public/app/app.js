(function () {
    'use strict';
    
    angular
        .module('listieMcListface', ['ui.router', 'ngMaterial', 'ngMessages'])
        .config(function($locationProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
    
            $locationProvider.html5Mode(true);
        });

})();