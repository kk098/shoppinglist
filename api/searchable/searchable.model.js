'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SearchableSchema = new Schema({
    name: String,
    category: {
        type: String,
        default: "uncategorized"
    },
    aliases: [
        { name: String }
    ]
});

module.exports = mongoose.model('Searchable', SearchableSchema);
