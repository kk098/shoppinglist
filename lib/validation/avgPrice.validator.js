'use strict';

var _ = require('lodash');
var defer = require("node-promise").defer;

module.exports = {
    avgPriceCheck : avgPriceCheck
};

///// Public functions
function avgPriceCheck(item, avgPrice, varianz) {
    var deferred = defer();
    var amount = _checkForAmount(item.title);
    var result = {};
    var itemprice;

    if (item.pricePerUnit !== "") {
        itemprice = _parsePrice(item.pricePerUnit);
    } else {
        itemprice = _parsePrice((item.price / amount));
    }

    result.usedPrice = itemprice;
    result.validation.avg = (itemprice < (avgPrice + varianz) && itemprice > (avgPrice - varianz));

    return deferred.resolve(result);
}
///// Public functions

function _parsePrice(price){
    var number;
    var currency = price;
    var tmpcurrency = currency.replace(',','.');
    number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));

    return number;
}

function _checkForAmount(title){
    var deffer = defer();
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
    return deffer.resolve(amount);
}