'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    amount: Number,
    unit: String
});

module.exports = mongoose.model('Item', ItemSchema);
