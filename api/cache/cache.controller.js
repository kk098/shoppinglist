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


// Get list of matching items
exports.match = function(req, res) {
    console.log(req.params);

    Cache.find({name: new RegExp(req.params.string, "i")}, function (err, cache) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(cache);
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