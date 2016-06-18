(function () {
    'use strict';

    angular
        .module('listieMcListface')
        .directive('autocomplete', autocomplete);

    autocomplete.$inject = ['$timeout', 'dataservice', '$parse', '$http', '$interpolate'];

    function autocomplete($timeout, dataservice, $parse, $http, $interpolate) {
        /**
         * @desc autocomplete directive
         * @example <div autocomplete things="vm.model"></div>
         */

        var directive = {
            restrict: 'A',
            require: 'ngModel',
            compile: compile
        };

        return directive;

        function compile(elem, attrs) {
            var modelAccessor = $parse(attrs.ngModel),
                labelExpression = attrs.label;

            return function (scope, iElement, iAttrs) {
                var
                    mappedItems = [],
                    allowCustomEntry = attrs.allowCustomEntry || false;

                iElement.autocomplete({
                    source: function (request, response) {

                        dataservice.getMatching(request.term).then(function (res) {
                            mappedItems = $.map(res, function (item) {
                                var result = {};

                                if (typeof item.name === 'string') {
                                    result.label = item.name;
                                    result.value = item.name;

                                    return result;
                                }

                                result.label = $interpolate(labelExpression)(item);

                                if (attrs.value) {
                                    result.value = item[attrs.value];
                                }
                                else {
                                    result.value = item;
                                }

                                return result;
                            });

                            return response(mappedItems);
                        }, function (err) {
                            $log('oh noes: ', err)
                        });
                    },
                    select: function () {
                        $timeout(function () {
                            iElement.trigger('input');
                        }, 0);
                    }
                });
            };
        }
    }
})();