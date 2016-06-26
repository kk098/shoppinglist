'use strict';

var _ = require('lodash');
var Cache = require('./cache.model');
var searchApi = require('../../lib/productSearch/combinedsearch');

// Get list of items
exports.index = function(req, res) {
    Cache.find(req.query, function (err, items) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(items);
    });
};

// Get one items
exports.show = function(req, res) {
    Cache.findById(req.params.id, function (err, item) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(item);
    });
};

exports.create = function(req, res) {
    console.log(req.body);

    Cache.create(req.body, function(err, item) {
        if(err) { return handleError(res, err); }

        return res.status(200).json(item);
    });
};


function handleError(res, err) {
    return res.status(500).send(err)
}