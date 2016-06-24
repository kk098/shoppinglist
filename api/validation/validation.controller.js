'use strict';

var _ = require('lodash');
var searchApi = require('../../lib/productSearch/combinedsearch');
var validation = require('../../lib/validation/validation');

exports.validate = function(req, res) {
    console.log(req.body);
    var result = {};

    var keywords = _buildSearch(req.body);

    return res.status(200).json(keywords);
};


function handleError(res, err) {
    return res.send(500, err);
}


function _startSearch(keywords) {
    console.log('_startSearch');

    if (keywords.length < 1) { console.log("keyword array is empty"); return; }

    var results = [];

    _.each(keywords, function (keyword) {
        if (typeof keyword !== 'string') { console.log("keyword isn't a string!"); return; }

        var searchResult = searchApi.search(keyword);

        _.each(searchResult, function (vendorResults) {
            var items = vendorResults.itemInformation;

            if (items.length > 0) {
                _.each(items, function (item) {
                    results.push(item);
                })
            } else {
                console.log('itemInformation array is empty or not available')
            }
        });
    });

    validation.validateProducts(results);

    return results

}

function _buildSearch(data) {
    console.log('_buildSearch');

    var results = [];

    if (data.object.label && typeof data.object.label === 'string') {
        results.push(data.object.label);

        if (data.object.value.aliases) {
            _.each(data.object.value.aliases, function (keyword) {
                results.push(keyword);
            });
        }
    } else {
        results.push(data.object);
    }

    _startSearch(results);

    return results
}