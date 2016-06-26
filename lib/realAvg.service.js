'use strict';

var _ = require('lodash');
var defer = require("node-promise").defer;

module.exports = {
    getRealAvg : getAvgPrice
};

function getAvgPrice(items, meta){
    var sumPrice = 0;
    var realAvg;
    var counter = 0;

    _.each(items, function (item) {
       if(item.used == 2 && !isNaN(item.usedPrice)) {
           sumPrice += item.usedPrice;
           counter++;
       }
    });
    realAvg = (sumPrice / counter);
    realAvg = realAvg * meta.amount;
    return realAvg.toFixed(2);
}