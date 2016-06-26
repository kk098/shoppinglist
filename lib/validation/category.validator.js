'use strict';

var _ = require('lodash');

module.exports = {
    checkCategory : checkCategory
};

function checkCategory(item, category, callback) {
    var result = true;
    
    if(category == "lebensmittel" && item.pricePerUnit == ''){
        result = false;
    }

    callback(result);
}