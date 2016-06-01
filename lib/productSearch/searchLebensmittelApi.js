/**
 * Created by kathi on 12.05.16.
 * LEBENSMITTEL
 */
var trim = require('trim');
var queryString = require('querystring');
var syncRequest = require('sync-request');

module.exports = {
    apiSearch: apiSearch
};

function apiSearch(keyWord) {
    var searchURL = 'http://www.lebensmittel.de/?p=search_result&CityID=-1&filterLocationID=-1&KatName=&filterKategorie1=&query=' + queryString.escape(keyWord) + '&suchen=jetzt+suchen';

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

//returns dataObject with information about the 5 first items that were found on lebensmittel.de
function getInformation(htmlString, keyWord) {
    var dataObject = {
        log: 'Lebensmittel: ' + keyWord,
        status: 0,
        itemInformation: []
    };
    //var contents = fs.readFileSync(htmlString).toString();
    var cheerio = require('cheerio'), $ = cheerio.load(htmlString);

    //find product description
    var items = ($('div .product_box'));
    //console.log($(items).text());

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
        
        var tempItem = {
            title: $('#ProductName > strong', content).text(),
            price: getPrice(),
            pricePerUnit: $('.produkt_beschreibung > .rightText', content).text()
        };
        dataObject.itemInformation.push(tempItem);
    });

    return dataObject;
}