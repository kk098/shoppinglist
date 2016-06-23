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
    info: {
        rewe: [{
            title: String,
            price: Number,
            ppu: String,
            link: String
        }],
        amazon: [{
            title: String,
            price: Number,
            ppu: String,
            link: String
        }],
        lebensmittel: [{
            title: String,
            price: Number,
            ppu: String,
            link: String
        }],
        custom: [{
            title: String,
            price: Number,
            ppu: String,
            link: String
        }]
    }
});

module.exports = mongoose.model('Item', ItemSchema);
