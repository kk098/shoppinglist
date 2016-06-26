'use strict';

//TODO: ppu als indikator für dings
//TODO: Preisdifferenzen (min - max) als indikator
var _ = require("lodash");
var spell = require("./spell.validator");
var averagePrice = require("./avgPrice.validator");



module.exports = {
    validateProducts: validateProducts,
    validateSpelling: spell.spellCheck
};

///// Public functions
function validateProducts(items, meta) {
    console.log('validateProducts');
    console.log(items.length);

    var result = [];
    var avgPrice = _getAvg(items);
    var varianz = _getVarianz(items, avgPrice);

    _.each(items, function (item) {
        //usedPrice, validation
        /*{
            usedPrice: '',
            validation : {
                avg: ''
            }
        }*/
        var priceCheck = averagePrice.avgPriceCheck(item, avgPrice, varianz);
        item.usedPrice = priceCheck.usedPrice;
        item.validation.avg = priceCheck.validation.avg;
        // result.push(JSON.stringify(item));
        result.push(item);
    });

    //evaluation

    //parseAmountService
    return _resultBuilder(result, meta, avgPrice);
}

//TODO: Hier werden die einzelnen funktionen aus den verschiedenen validate dateien aufgerufen nachdem sie über require eingebunden wurden.
//TODO: die funktionen werden gebündelt in validateProducts aufgerufen und dort wird das resultarray zusammengebaut.
///// Private functions

function _validatePrice(item) {
    
}

function _getAvg(items) {
    var price = 0;
    _.each(items, function (item) {
        var itemprice;
        var amount = _checkForAmount(item.title);
        if(item.pricePerUnit !== "") {
            itemprice = _parsePrice(item.pricePerUnit);
        } else {
            itemprice = _parsePrice((item.price / amount));
        }
        price +=itemprice;
    });
    return price / items.length;
}

function _getVarianz(items, avgPrice) {
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

function _parsePrice(price){
    var currency = price;
    var tmpcurrency = currency.replace(',','.');
    var number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));

    return number;
}

function _checkForAmount(title){
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

function _resultBuilder(data, reqBody, avgPrice) {
    var name = (typeof reqBody.object === 'string' ? reqBody.object : reqBody.object.label);

    return {
        name: name,
        category: reqBody.category,
        amount: reqBody.amount,
        items: data,
        avgPrice: avgPrice
    };
}