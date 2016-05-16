/**
 * Created by kathi on 08.05.16.
 * AMAZON
 */
var trim = require('trim');
var queryString = require('querystring');
var syncRequest = require('sync-request');

module.exports = {
    apiSearch: apiSearch
};

function apiSearch(keyWord) {
    var searchURL = 'http://www.amazon.de/s/ref=nb_sb_noss_2?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords='+ queryString.escape(keyWord);

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
        log: 'Amazon: ' + keyWord,
        status: 0,
        itemInformation: []
    };
    //var contents = fs.readFileSync(htmlString).toString();
    var cheerio = require('cheerio'), $ = cheerio.load(htmlString);
    //find all items with a special class
    var result = $('#atfResults').find('li.s-result-item');
    //trim array to first 5 search results
    var items = result.splice(0, 5);

    $(items).each(function(index,content){
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