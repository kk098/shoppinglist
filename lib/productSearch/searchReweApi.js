/**
 * Created by kathi on 16.05.16.
 * REWE
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

// get search results for keyword on shop.rewe.de
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
    var searchURL = 'https://shop.rewe.de/productList?search=' + queryString.escape(keyWord);

    // define empty result
    var result = {
        vendor: '',
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

//returns dataObject with information about the 5 first items that were found on rewe.de
// log: optional log entries with status messages
// status: statuscode, if less than 0 then it's an errorcode
// itemInformation[]: array with the real search results
//
// entries in itemInformation consist of:
// title: title of result item on rewe website
// price: price for the result item
// pricePerUnit: price per sales unit (e.g. price/kg)
function getInformation(htmlString, keyWord) {
    console.log(htmlString);
    var dataObject = {
        vendor: 'Rewe',
        log: 'Rewe: ' + keyWord,
        status: 0,
        itemInformation: []
    };

    // parses html string and provides access to dom tree
    // interface is similar to jquery
    var cheerio = require('cheerio'), $ = cheerio.load(htmlString);

    //var items = $('#productContainer > div.product-container-inner > div.item');
    var items = $('div.rs-js-product-item > div.rs-qa-product');
    //console.log("rewe items: " + items.length);

    //Create JSON Object for first 5 search results
    items.each(function (index, item) {
        if (index >= 5) {
            return;
        }

        //Get price per unit or empty string in case no price per unit was found
/*        function getPricePerUnit() {
            //Use regular expression to get price per unit description inside round brackets
            var reg = /\((.*)\)/;
            var tmpPricePerUnit = trim($(item).find('.details > .base-price').text());
            if (tmpPricePerUnit.match(reg) != null) {
                return (tmpPricePerUnit.match(reg)[1]);
            }
            //If price per unit is not available or the price itself is already the price per unit return empty string
            else
                return " ";
        }*/

        function getPricePerUnit(priceDetails) {
            return $(priceDetails).find('.rs-qa-price-base').text();
        }

        function getPrice(priceDetails) {
            var mark = $(priceDetails).find('mark.rs-qa-price');

            var price = $(mark).find('span.rs-price__predecimal').text()
                + $(mark).find('span.rs-price__separator').text()
                + $(mark).find('span.rs-price__decimal').text()
                + $(mark).find('span.rs-price__currency').text();

            return price;
        }

        var link = $(item).find('.rs-qa-product-title > a.rs-qa-product-details-link');
        var priceDetails = $(item).find('.rs-qa-product-price-details');

        var tmpItem = {
            title: trim(link.text()),
            price: trim(getPrice(priceDetails)),
            pricePerUnit: trim(getPricePerUnit(priceDetails)),
            url: link.attr('href')
        };
        /*var tmpItem = {
            title: trim($(item).find('a').attr('title')),
            price: trim($(item).find('.price > .calc > strong').text()),
            pricePerUnit: getPricePerUnit()
        };*/

        dataObject.itemInformation.push(tmpItem);
    });

//    console.log(JSON.stringify(dataObject, 0, 2));
    return dataObject;

}

