'use strict';

var request = require('request');
var _ = require('lodash');
var parseString = require('xml2js').parseString;
var defer = require("node-promise").defer;


module.exports = {
    spellCheck: spellCheck
};

///// Public functions
function spellCheck(keyword) {
    var deferred = defer();
    console.log('spellCheck');
    
    var url = 'http://suggestqueries.google.com/complete/search?output=toolbar&hl=de&q=' + keyword;

    request(url, function (err, res, data) {
        if (!err && res.statusCode == 200) {
            parseString(data, function (err, res) {
                var suggestions = res.toplevel.CompleteSuggestion;

                if (suggestions && suggestions.length > 0) {
                    var result = suggestions[0].suggestion[0]['$'].data.toLowerCase().trim();

                    _.each(suggestions, function (suggestion) {
                        var name = suggestion.suggestion[0]['$'].data.toLowerCase().trim();
                        keyword = keyword.toLowerCase().trim();

                        if (keyword === name) {
                            result = keyword.toLowerCase().trim();
                        }
                    });
                }

                console.log(keyword + ' wurde überprüft. ' + result + ' wurde genommen');

                return deferred.resolve(result);
            });
        }
    });

    return deferred;
}

