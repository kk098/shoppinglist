'use strict';

var _ = require('lodash');
var defer = require("node-promise").defer;

module.exports = {
    getRealAvg : getAvgPrice
};

function getAvgPrice(items, callback){
    var sumPrice = 0;
    var realAvg;
    var counter = 0;

    _.each(items, function (item) {
       if(item.used == 2) {
           sumPrice += item.usedPrice;
           counter++;
       }
    });
    realAvg = (sumPrice / counter);

    callback(realAvg);
}