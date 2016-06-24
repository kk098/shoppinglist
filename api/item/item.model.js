'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
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
    items: [{
        title: String,
        price: Number,
        ppu: String,
        url: String,
        vendor: String
    }]
});

module.exports = mongoose.model('Item', ItemSchema);
