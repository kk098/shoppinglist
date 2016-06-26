'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name   : { type: String, lowercase: true, trim: true },
    amount: Number,
    category: String,
    status: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 1
    },
    created: {
        type : Date, default: Date.now
    },
    items: []
});

module.exports = mongoose.model('Item', ItemSchema);
