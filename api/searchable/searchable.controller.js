'use strict';

var _ = require('lodash');
var Searchable = require('./searchable.model');
var searchApi = require('../../lib/productSearch/combinedsearch');

// Get list of items
exports.index = function(req, res) {
    Searchable.find({}, 'name -_id', function (err, searchables) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(searchables);
    });
};

// Get list of matching items
exports.match = function(req, res) {
    console.log(req.params);

    Searchable.find({name: new RegExp(req.params.string, "i")}, function (err, searchables) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(searchables);
    });
};

exports.create = function(req, res) {
    console.log(req.body);

    Searchable.create(req.body, function(err, searchable) {
        if(err) { return handleError(res, err); }

        return res.status(200).json(searchable);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}