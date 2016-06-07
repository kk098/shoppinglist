'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    amount: Number,
    unit: String,
    info: {
        rewe: [{
            title: String,
            price: Number,
            ppu: String
        }],
        amazon: [{
            title: String,
            price: Number,
            ppu: String
        }],
        lebensmittel: [{
            title: String,
            price: Number,
            ppu: String
        }],
        custom: [{
            title: String,
            price: Number,
            ppu: String
        }]
    }
});

module.exports = mongoose.model('Item', ItemSchema);
