/**
 * Created by kathi on 16.05.16.
 */
var searchRewe = require('./searchReweApi');
var searchAmazon = require('./searchAmazonApi');
var searchLebensmittel = require('./searchLebensmittelApi');
var validation = require('./../validation');

module.exports = {
    search: function(keyword) {
        var results = [
            searchRewe.apiSearch(keyword),
            searchAmazon.apiSearch(keyword),
            searchLebensmittel.apiSearch(keyword)
        ];

        var filtered = validation.validateProducts(results);

        console.log(filtered);

        return results;
    }
};
