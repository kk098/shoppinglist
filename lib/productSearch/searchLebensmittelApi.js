/**
 * Created by kathi on 12.05.16.
 * LEBENSMITTEL
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

// get search results for keyword from shop at www.lebensmittel.de
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
    var searchURL = 'http://www.lebensmittel.de/?p=search_result&CityID=-1&filterLocationID=-1&KatName=&filterKategorie1=&query=' + queryString.escape(keyWord) + '&suchen=jetzt+suchen';

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

//returns dataObject with information about the 5 first items that were found on lebensmittel.de
// log: optional log entries with status messages
// status: statuscode, if less than 0 then it's an errorcode
// itemInformation[]: array with the real search results
//
// entries in itemInformation consist of:
// title: title of result item on lebensmittel.de website
// price: price for the result item
// pricePerUnit: price per sales unit (e.g. price/kg)
function getInformation(htmlString, keyWord) {
    var dataObject = {
        vendor: 'Lebensmittel',
        log: 'Lebensmittel: ' + keyWord,
        status: 0,
        itemInformation: []
    };
    // parses html string and provides access to dom tree
    // interface is similar to jquery
    var cheerio = require('cheerio'), $ = cheerio.load(htmlString);

    //find product description
    var items = ($('div .product_box'));

    $(items).each(function (index, content) {
        
        //Get price per unit or empty string in case no price per unit was found
        function getPrice() {
            //Use regular expression to get price without * behind
            var reg = /^(.+?)\s\*/;
            var tmpPrice = trim($('#Price', content).text());
            if (tmpPrice.match(reg) != null) {
                return (tmpPrice.match(reg)[1]);
            }
            //If price is not available return empty string
            else
                return " ";
        }

        //Get product number to build detail url link for the special product
        function getProductNumber(){
            var tmpContent = trim($('.prodpic', content).attr('onclick'));
            var split = tmpContent.split('\', \'');
            if(split != null){
                return (split[1]);
            }
        }
        
        var tempItem = {
            title: $('#ProductName > strong', content).text(),
            price: getPrice(),
            pricePerUnit: $('.produkt_beschreibung > .rightText', content).text(),
            url: 'http://www.lebensmittel.de/?p=artdetails&from_page=search&Artikel='+ getProductNumber()
        };
        dataObject.itemInformation.push(tempItem);
    });

    return dataObject;
}