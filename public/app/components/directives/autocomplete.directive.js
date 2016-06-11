/**
 * @desc autocomplete directive
 * @example <div autocomplete things="vm.model"></div>
 */
angular
    .module('listieMcListface')
    .directive('autocomplete', autocomplete);

autocomplete.$inject = ['$timeout', 'dataservice'];

function autocomplete($timeout, dataservice) {
    return function(scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: dataservice.getBaseProducts(),
            select: function() {
                $timeout(function() {
                    iElement.trigger('input');
                }, 0);
            }
        });
    };
}