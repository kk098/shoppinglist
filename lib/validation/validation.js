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
    _getAvg(items, function (avgPrice) {
        _getVarianz(items, avgPrice, function (varianz) {
            _.each(items, function (item) {
                averagePrice.avgPriceCheck(item, avgPrice, varianz, function (priceCheck) {
                    item.usedPrice = priceCheck.usedPrice;
                    item.validation = {};
                    item.validation.avg = priceCheck.validation.avg;
                    category.checkCategory(item, meta.category, function (category) {
                        item.validation.category = category;
                        item.used = _evalValidators(item, meta);
                        result.push(item);
                    });
                });
            });
        });
    });
    realAvg.getRealAvg(result, function(realAvg){
        realAvgPrice = realAvg;
        return _resultBuilder(result, meta, realAvgPrice);
    });
    //evaluation
}

//TODO: Hier werden die einzelnen funktionen aus den verschiedenen validate dateien aufgerufen nachdem sie über require eingebunden wurden.
//TODO: die funktionen werden gebündelt in validateProducts aufgerufen und dort wird das resultarray zusammengebaut.
///// Private functions

function _getAvg(items, callback) {
    var price = 0;
    _.each(items, function (item) {
        var itemprice;
        var amount = _checkForAmount(item.title);
        if(item.pricePerUnit !== "") {
            itemprice = _parsePrice(item.pricePerUnit);
        } else {
            if(amount){
                itemprice = _parsePrice(item.price, amount);
            }else {
                itemprice = _parsePrice(item.price);
            }
        }
        price +=itemprice;
    });
    callback(price / items.length);
}

function _getVarianz(items, avgPrice, callback) {
    var squareprice = 0;
    _.each(items, function(item) {
        var itemprice;
        var amount = _checkForAmount(item.title);
        if(item.pricePerUnit !== "") {
            itemprice = _parsePrice(item.pricePerUnit);
        } else {
            if(amount){
                itemprice = _parsePrice(item.price, amount);
            }else {
                itemprice = _parsePrice(item.price);
            }
        }
        squareprice += Math.pow((itemprice - avgPrice),2);
    });
    callback(Math.sqrt(squareprice / items.length));
}

function _parsePrice(price, amount){
    var number;
    var currency = price;
    var tmpcurrency = currency.replace(',','.');
    number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));
    if(amount) number = number / amount;

    return number;
}

function _checkForAmount(title){
    var defferd = defer();
    var amount = 1;

    for(var i = 1; i < 15; i++){
        var testString = [i+' x', i+'x', i+'*', i+' *'];

        for(var y = 0; y < testString.length; y++){
            if(title.indexOf(testString[y]) != -1){
                amount = i;
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
        return 0;
    }

    if (val1 && val2) {
        return 2;
    }

    if(val1 || val2) {
        return 1;
    }

    if (!val1 && !val2) {
        return 0;
    }

}