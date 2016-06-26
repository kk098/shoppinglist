'use strict';

//TODO: ppu als indikator für dings
//TODO: Preisdifferenzen (min - max) als indikator
var _ = require("lodash");
var spell = require("./spell.validator");



module.exports = {
    validateProducts: validateProducts,
    validateSpelling: spell.spellCheck
};

///// Public functions
function validateProducts(items, meta) {
    console.log('validateProducts');
    console.log(items.length);

    var result = [];

    _.each(items, function (item) {
        // result.push(JSON.stringify(item));
        result.push(item);
    });
    
    return _resultBuilder(result, meta);
}

//TODO: Hier werden die einzelnen funktionen aus den verschiedenen validate dateien aufgerufen nachdem sie über require eingebunden wurden.
//TODO: die funktionen werden gebündelt in validateProducts aufgerufen und dort wird das resultarray zusammengebaut.
///// Private functions
function _validateIwas(item) {
    
}

function _resultBuilder(data, reqBody) {
    var name = (typeof reqBody.object === 'string' ? reqBody.object : reqBody.object.label);

    return {
        name: name,
        category: reqBody.category,
        amount: reqBody.amount,
        items: data
    };
}