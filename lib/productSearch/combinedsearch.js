/**
 * Created by kathi on 16.05.16.
 */
var searchRewe = require('./searchReweApi');
var searchAmazon = require('./searchAmazonApi');
var searchLebensmittel = require('./searchLebensmittelApi');
var validation = require('./../validation/validation');

// define module exports
// given functions are accessible from outside the module
module.exports = {
    search: function(keyword) { // synchronously fetch results from each known search api and return those combined results
        var results = [
            searchRewe.apiSearch(keyword),
            searchAmazon.apiSearch(keyword),
            searchLebensmittel.apiSearch(keyword)
        ];

        // var filtered = validation.validateProducts(results);


        return results;
    }
};
