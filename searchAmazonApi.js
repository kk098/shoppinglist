/**
 * Created by kathi on 08.05.16.
 * AMAZON
 */
var trim = require('trim');
var queryString = require('querystring');
var syncRequest = require('sync-request');

// define which functions are exposed when this
// script is used as a node.js module
// other functions are hidden and not visible from the outside
module.exports = {
    apiSearch: apiSearch // search for given keyword using underlying search api
};

// get amazon search results for keyword
//
// returns dataobject with format: 
// log: optional log entries with status messages 
// status: statuscode, if less than 0 then it's an errorcode
// itemInformation[]: array with the real search results
//
// entries in itemInformation consist of:
// title: title of result item on amazon website
// price: price for the result item
// pricePerUnit: price per sales unit (e.g. price/kg)
function apiSearch(keyWord) {
    var searchURL = 'http://www.amazon.de/s/ref=nb_sb_noss_2?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords='
        + queryString.escape(keyWord);

    // empty result, in case something goes wrong
    var result = {
        log: '',
        status: 0,
        itemInformation: []
    };

    var response = "";

    try {
        // make sync url request because we need results immediately
        // and it simplifies our code
        response = syncRequest('GET', searchURL);
    } catch (err) {
        // called when url could not be fetched
        result.status = -1;
        return result;
    }

    // to be sure: convert response to utf8 (in some cases the result is 
    // only BUFFERDATA) and extract information
    return getInformation(response.getBody('utf8'), keyWord);
}


//returns dataObject with information about the 5 first items that were found on amazon.de
// log: optional log entries with status messages 
// status: statuscode, if less than 0 then it's an errorcode
// itemInformation[]: array with the real search results
//
// entries in itemInformation consist of:
// title: title of result item on amazon website
// price: price for the result item
// pricePerUnit: price per sales unit (e.g. price/kg)
function getInformation(htmlString, keyWord) {
    var dataObject = {
        log: 'Amazon: ' + keyWord,
        status: 0,
        itemInformation: []
    };

    // parses html string and provides access to dom tree 
    // interface is similar to jquery
    var cheerio = require('cheerio'), $ = cheerio.load(htmlString);

    //find all items with a special class
    var result = $('#atfResults').find('li.s-result-item');
    //trim array to first 5 search results
    var items = result.splice(0, 5);

    // create storage object for each item and store it in dataObject
    $(items).each(function (index, content) {
        var tempItem = {
            title: $('h2', content).text(),
            price: $('.a-link-normal .a-color-price.s-price', content).text(),
            pricePerUnit: $('.a-row > .a-size-base.a-color-price', content).text()
        };
        dataObject.itemInformation.push(tempItem);
    });

    return dataObject;

    //TEST LOG ===============================================================
//item description
//    console.log($('h2', items).text());
//item price
//    console.log($('.a-link-normal .a-color-price.s-price', items).text());
//item price per unit
//    console.log($('.a-row > .a-size-base.a-color-price', items).text());

}