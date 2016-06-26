'use strict';

//TODO: ppu als indikator für dings
//TODO: Preisdifferenzen (min - max) als indikator
var _ = require("lodash");
var spell = require("./spell.validator");
var averagePrice = require("./avgPrice.validator");
var realAvg = require("./../realAvg.service");
var category = require("./category.validator");
var defer = require("node-promise").defer;



module.exports = {
    validateProducts: validateProducts,
    validateSpelling: spell.spellCheck
};

///// Public functions
function validateProducts(items, meta) {
    console.log('validateProducts');
    console.log(items.length);

    var result = [];
    var realAvgPrice;
    var avgPrice = _getAvg(items);
    var varianz = _getVarianz(items, avgPrice);

    _.each(items, function (item) {
        //usedPrice, validation
        if(category.checkCategory(item, meta.category)) {
            var priceCheck = averagePrice.avgPriceCheck(item, avgPrice, varianz);
            item.usedPrice = priceCheck.usedPrice;
            item.validation = undefined;
            item.validation.avg = priceCheck.validation.avg;
        }
        result.push(item);
    });

    //evaluation

    realAvgPrice = realAvg.getRealAvg(result);
    return _resultBuilder(result, meta, realAvgPrice);
}

//TODO: Hier werden die einzelnen funktionen aus den verschiedenen validate dateien aufgerufen nachdem sie über require eingebunden wurden.
//TODO: die funktionen werden gebündelt in validateProducts aufgerufen und dort wird das resultarray zusammengebaut.
///// Private functions

function _validatePrice(item) {
    
}

function _getAvg(items) {
    var defferd = defer();
    var price = 0;
    _.each(items, function (item) {
        var itemprice;
        var amount = _checkForAmount(item.title);
        if(item.pricePerUnit !== "") {
            itemprice = _parsePrice(item.pricePerUnit);
        } else {
            itemprice = _parsePrice(item.price);
        }
        price +=itemprice;
    });
    return defferd.resolve(price / items.length)
}

function _getVarianz(items, avgPrice) {
    var defferd = defer();
    var squareprice = 0;
    _.each(items, function(item) {
        var itemprice;
        if(item.pricePerUnit !== "") {
            itemprice = _parsePrice(item.pricePerUnit);
        } else {
            itemprice = _parsePrice(item.price);
        }
        squareprice += Math.pow((itemprice - avgPrice));
    });
    return defferd.resolve(Math.sqrt(squareprice / items.length));
}

function _parsePrice(price){
    var number;
    var currency = price;
    var tmpcurrency = currency.replace(',','.');
    number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));

    return number;
}

function _checkForAmount(title){
    var defferd = defer();
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
    return defferd.resolve(amount);
}

function _resultBuilder(data, reqBody, realAvgPrice) {
    var name = (typeof reqBody.object === 'string' ? reqBody.object : reqBody.object.label);

    return {
        name: name,
        category: reqBody.category,
        amount: reqBody.amount,
        items: data,
        avgPrice: realAvgPrice
    };
}

function _evalValidators(item, meta) {
    var val1 = item.validation.avg;
    var val2 = item.validation.category;

    if (meta.category === 'lebensmittel' && !val2) {
        return false;
    }

    if (val1 && val2) {
        return true;
    }

    if(val1 || val2) {
        return true;
    }

    if (!val1 && !val2) {
        return false;
    }

}