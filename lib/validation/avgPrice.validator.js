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
function avgPriceCheck(dataSet) {
    var result = [];
    var avgPrice = 0;
    var varianz = 0;
    var price = 0;

    avgPrice = getAvg(dataSet);
    varianz = getVarianz(dataSet, avgPrice);

    _.each(dataSet, function (item) {
        var itemprice;
        if (item.pricePerUnit !== "") {
            itemprice = parsePrice(item.pricePerUnit);
        } else {
            itemprice = parsePrice(item.price);
        }
        item.usedPrice = itemprice;
        if(itemprice < (avgPrice + varianz) && itemprice > (avgPrice - varianz)) {
            item.validation.avg = true;
            result[0].push(item);
        }else {
            item.validation.avg = false;
            result[1].push(item);
        }
    });
    return 
}
///// Public functions


function getAvg(items){
    var price = 0;
    _.each(items, function (item) {
        var itemprice;
        if(item.pricePerUnit !== "") {
            itemprice = parsePrice(item.pricePerUnit);
        } else {
            itemprice = parsePrice(item.price);
        }
        price +=itemprice;
    });
    return price / items.length;
}

function getVarianz(items, avgPrice) {
    var squareprice = 0;
    _.each(items, function(item) {
        var itemprice;
        if(item.pricePerUnit !== "") {
            itemprice = parsePrice(item.pricePerUnit);
        } else {
            itemprice = parsePrice(item.price);
        }
        squareprice += Math.pow((itemprice - avgPrice));
    });
    return Math.sqrt(squareprice / items.length);
}

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