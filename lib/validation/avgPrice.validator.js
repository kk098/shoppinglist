'use strict';

var _ = require('lodash');

module.exports = {
    avgPriceCheck : avgPriceCheck
};

///// Public functions
function avgPriceCheck(item, avgPrice, varianz, callback) {
    _checkForAmount(item.title, function(amount) {
        var result = {};
        var itemprice;
        if (item.pricePerUnit !== "") {
            itemprice = _parsePrice(item.pricePerUnit);
            if((itemprice < (avgPrice + varianz) && itemprice > (avgPrice - varianz))) {
                if(amount){
                    itemprice = _parsePrice(item.price, amount);
                }else {
                    itemprice = _parsePrice(item.price);
                }
            }
        } else {
            if(amount){
                itemprice = _parsePrice(item.price, amount);
            }else {
                itemprice = _parsePrice(item.price);
            }
        }

        result.usedPrice = itemprice;
        result.validation = {};
        result.validation.avg = !!(itemprice < (avgPrice + varianz) && itemprice > (avgPrice - varianz));
        callback(result);
    });
    //return deferred.resolve(result);
}
///// Private functions

function _parsePrice(price, amount){
    var number;
    var currency = price;
    var tmpcurrency = currency.replace(',','.');
    number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));
    if(amount) number = number / amount;

    return number.toFixed(2);
}

function _checkForAmount(title, callback){
    var amount = 1;

    for(var i = 1; i < 15; i++){
        var testString = [i+' x', i+'x', i+'*', i+' *'];

        for(var y = 0; y < testString.length; y++){
            if(title.indexOf(testString[y]) != -1){
                //console.log(String.indexOf(testString));
                amount = i;
                //console.log(String);
            }
        }
    }
    callback(amount);
}