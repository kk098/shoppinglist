'use strict';

angular
    .module('listieMcListface', ['ui.router', 'ngMaterial'])
    .config(function($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

        console.log("hello");
    });