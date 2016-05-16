/**
 * Created by kathi on 16.05.16.
 * REWE
 */
var trim = require('trim');
var queryString = require('querystring');
var syncRequest = require('sync-request');

module.exports = {
  apiSearch: apiSearch
};

function apiSearch(keyWord) {
    var searchURL = 'https://shop.rewe.de/productList?search=' + queryString.escape(keyWord);

    var result = {
        log: '',
        status: 0,
        itemInformation: []
    };

    var response = "";

    try {
        response = syncRequest('GET', searchURL);
    } catch (err) {
        result.status = -1;
        return result;
    }

    return getInformation(response.getBody('utf8'), keyWord);
}

//returns dataObject with information about the 5 first items that were found on amazon.de
function getInformation(htmlString, keyWord) {
    var dataObject = {
        log: 'Rewe: ' + keyWord,
        status: 0,
        itemInformation: []
    };
    //var contents = fs.readFileSync(htmlString).toString();
    var cheerio = require('cheerio'), $ = cheerio.load(htmlString);

    var items = $('#productContainer > div.product-container-inner > div.item');

    //Create JSON Object for first 5 search results
    items.each(function (index, item) {
        if (index >= 5) {
            return;
        }

        //Get price per unit or empty string in case no price per unit was found
        function getPricePerUnit() {
            //Use regular expression to get price per unit description inside round brackets
            var reg = /\((.*)\)/;
            var tmpPricePerUnit = trim($(item).find('.details > .base-price').text());
            if (tmpPricePerUnit.match(reg) != null) {
                return (tmpPricePerUnit.match(reg)[1]);
            }
            //If price per unit is not available or the price itself is already the price per unit return empty string
            else
                return " ";
        }

        var tmpItem = {
            title: trim($(item).find('a').attr('title')),
            price: trim($(item).find('.price > .calc > strong').text()),
            pricePerUnit: getPricePerUnit()
        };

        dataObject.itemInformation.push(tmpItem);
    });

//    console.log(JSON.stringify(dataObject, 0, 2));
    return dataObject;

}
