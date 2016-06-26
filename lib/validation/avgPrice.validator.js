'use strict';

var request = require('request');
var _ = require('lodash');
var parseString = require('xml2js').parseString;
var defer = require("node-promise").defer;
var failed = [];

module.exports = {
    avgPriceCheck : avgPriceCheck
};

///// Public functions
function avgPriceCheck(item, avgPrice, varianz) {
    var deferred = defer();
    var amount = checkForAmount(item.title);
    var result = {};
    var itemprice;
    if (item.pricePerUnit !== "") {
        itemprice = parsePrice(item.pricePerUnit);
    } else {
        itemprice = parsePrice((item.price / amount));
    }
    result.usedPrice = itemprice;
    result.validation.avg = (itemprice < (avgPrice + varianz) && itemprice > (avgPrice - varianz));

    return deferred.resolve(result);
}
///// Public functions

function parsePrice(price){
    var currency = price;
    var tmpcurrency = currency.replace(',','.');
    var number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));

    return number;
}

function checkForAmount(title){
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
    return amount;
}