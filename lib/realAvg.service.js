'use strict';

var request = require('request');
var _ = require('lodash');
var defer = require("node-promise").defer;

module.exports = {
    getRealAvg : getAvgPrice
};

function getAvgPrice(items){
    var deffered = defer();
    var sumPrice = 0;
    var realAvg;
    var counter = 0;

    _.each(items, function (item) {
       if(item.used == true) {
           sumPrice += item.usedPrice;
           counter++;
       }
    });
    realAvg = (sumPrice / counter);

    return deffered.resolve(realAvg);
}