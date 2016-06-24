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
function validateProducts(items) {
    console.log('validateProducts');
    console.log(items.length);

    _.each(items, function (item) {
        console.log(item);
    });

    var result = "hallo";


    return result;
}

//TODO: Hier werden die einzelnen funktionen aus den verschiedenen validate dateien aufgerufen nachdem sie über require eingebunden wurden.
//TODO: die funktionen werden gebündelt in validateProducts aufgerufen und dort wird das resultarray zusammengebaut.
///// Private functions
function _validateIwas(item) {
    
}

