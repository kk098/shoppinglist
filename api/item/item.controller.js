'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var searchApi = require('../../lib/productSearch/combinedsearch');

// Get list of items
exports.index = function(req, res) {
    Item.find(function (err, items) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(items);
    });
};

exports.create = function(req, res) {
    console.log(req.body);
    
    var result = searchApi.search(req.body.searchString);

    return res.status(200).json(result);
};


function handleError(res, err) {
    return res.send(500, err);
}