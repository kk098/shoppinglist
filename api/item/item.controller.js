'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var searchApi = require('../../lib/productSearch/combinedsearch');

// Get list of items
exports.index = function(req, res) {
    Item.find(req.query, '-items ', function (err, items) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(items);
    });
};

// Get one items
exports.show = function(req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(item);
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

    Item.create(req.body, function(err, item) {
        if(err) { return handleError(res, err); }

        return res.status(200).json(item);
    });
};


function handleError(res, err) {
    return res.status(500).send(err)
}