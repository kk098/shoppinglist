'use strict';

var _ = require('lodash');

module.exports = {
    getRealAvg : getAvgPrice
};

function getAvgPrice(items){
    var sumPrice = 0;
    var realAvg;
    var counter = 0;

    _.each(items, function (item) {
    // use item only when both checks were passed
       if(item.used == 2 && !isNaN(item.usedPrice)) {
           sumPrice += item.usedPrice;
           counter++;
       }
    });
    realAvg = (sumPrice / counter);
    return realAvg.toFixed(2);
}