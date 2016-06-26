'use strict';

var _ = require('lodash');
var defer = require("node-promise").defer;

module.exports = {
    checkCategory : checkCategory
};

function checkCategory(item, category) {
    var deffered = defer();
    var result = true;
    
    if(category == "lebensmittel" && item.pricePerUnit == ''){
        result = false;
    }

    return deffered.resolve(result);
}