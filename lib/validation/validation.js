'use strict';

//TODO: ppu als indikator für dings
//TODO: Preisdifferenzen (min - max) als indikator
var spell = require("./spell.validator");



module.exports = {
    validateProducts: validateProducts,
    validateSpelling: spell.spellCheck
};

validateProducts('nix');


///// Public functions
function validateProducts(items) {
    console.log('validateProducts');

    

    console.log(items);
    var result = "hallo";


    return result;
}


///// Private functions
function _validateIwas(item) {
    
}

