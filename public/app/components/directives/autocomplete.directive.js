(function () {
    'use strict';

    angular
        .module('listieMcListface')
        .directive('autocomplete', autocomplete);

    autocomplete.$inject = ['$timeout', 'data', '$parse', '$http', '$interpolate'];

    function autocomplete($timeout, data, $parse, $http, $interpolate) {
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

                        data.getMatching(request.term).then(function (res) {
                            mappedItems = $.map(res, function (item) {
                                var result = {};

                                if (typeof item.name === 'string') {
                                    result.label = item.name;
                                    result.value = item;

                                    console.log(item);

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
                    select: function (event, ui) {
                        scope.$apply(function (scope) {
                            modelAccessor.assign(scope, ui.item);
                        });

                        if (attrs.onSelect) {
                            scope.$apply(attrs.onSelect);
                        }

                        iElement.val(ui.item.label);

                        event.preventDefault();
                    },
                });
            };
        }
    }
})();