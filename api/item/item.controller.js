'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var searchApi = require('../../lib/productSearch/combinedsearch');

// Get list of items
exports.index = function(req, res) {
    Item.find(req.query, function (err, items) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(items);
    });
};

exports.top = function(req, res) {
    Item
        .find()
        .sort({ count: 'asc' })
        .limit(15)
        .exec(function (err, items) {
            if (err) { return handleError(res, err); }

            return res.status(200).json(items);
        });
};

exports.create = function(req, res) {
    console.log(req.body);
    var keyword = '';

    if (req.body.object.label) {
        keyword = req.body.object.label;
    } else {
        keyword = req.body.object;
    }
    
    var result = searchApi.search(keyword);

    return res.status(200).json(result);
};


function handleError(res, err) {
    return res.send(500, err);
}