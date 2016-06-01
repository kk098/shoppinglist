'use strict';

angular
    .module('listieMcListface')
    .controller('MainController', MainController);

function MainController($log) {
    $log.debug('MainController loaded');
    var vm = this;

    vm.newItem = {};
}