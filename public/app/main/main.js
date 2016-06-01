'use strict';

angular.module('listieMcListface')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                cache: false,
                url: '/',
                templateUrl: 'partials/main',
                controller: 'MainController',
                controllerAs: 'vm'
            });
    });