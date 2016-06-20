'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SearchableSchema = new Schema({
    name: String,
    category: {
        type: String,
        default: "uncategorized"
    },
    count: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Searchable', SearchableSchema);
