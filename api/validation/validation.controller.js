'use strict';

var _ = require('lodash');
var defer = require("node-promise").defer;
var searchApi = require('../../lib/productSearch/combinedsearch');
var validation = require('../../lib/validation/validation');
var Item = require('../item/item.model');

exports.validate = function(req, res) {
    console.log(req.body);

    // var dbItem;
    //
    // var name = (typeof req.body.object === 'string' ? req.body.object : req.body.object.label);
    // var check = validation.validateSpelling(name);
    //
    // check.then(function (res) {
    //     Item.findOne({name: res}, function (err, item) {
    //         if (err) return handleError(err);
    //
    //         dbItem = item;
    //
    //         console.log(dbItem);
    //     });
    // });


    var builtArray = _buildArray(req.body);
    builtArray.then(function (data) {
        var validated = _startValidation(data, req.body);

        return res.status(200).json(validated);
    });
};


function handleError(res, err) {
    return res.send(500, err);
}

function _buildArray(data) {
    console.log('_buildArray');

    var results = [];
    var deferred = defer();

    if (data.object.label && typeof data.object.label === 'string') {
        // Spellcheck label
        var label = validation.validateSpelling(data.object.label);

        label.then(function (res) {
            //push label in array for craweler
            results.push(res);

            if (data.object.value.aliases) {
                //push aliases in array for craweler
                _.each(data.object.value.aliases, function (keyword) {
                    results.push(keyword);
                });
            }

            deferred.resolve(_startSearch(results));
        });
    } else {
        //spellcheck object
        var object = validation.validateSpelling(data.object);

        object.then(function (res) {
            //push object in array for craweler
            results.push(res);

            deferred.resolve(_startSearch(results));
        });
    }

    return deferred;
}

function _startSearch(keywords) {
    console.log('_startSearch');

    if (keywords.length < 1) { console.log("keyword array is empty"); return; }

    var results = [];

    _.each(keywords, function (keyword) {
        if (typeof keyword !== 'string') { console.log("keyword isn't a string!"); return; }

        // start crawler with every keyword
        var searchResult = searchApi.search(keyword);

        // iterate over every vendor
        _.each(searchResult, function (vendorResults) {
            var items = vendorResults.itemInformation;
            
            if (items.length > 0) {
                // push every craweld item in resul array
                _.each(items, function (item) {
                    results.push(item);
                })
            } else {
                console.log('itemInformation array from: ' + vendorResults.vendor + ' is empty or not available')
            }
        });
    });

    return results
}

function _startValidation(items, meta) {
    return validation.validateProducts(items, meta);
}