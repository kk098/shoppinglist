'use strict';

var _ = require('lodash');
var Item = require('./item.model');

// Get list of items
exports.index = function(req, res) {
    Item.find(function (err, items) {
        if (err) { return handleError(res, err); }

        return res.status(200).json(items);
    });
};


function handleError(res, err) {
    return res.send(500, err);
}