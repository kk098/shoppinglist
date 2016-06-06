'use strict';

var searchApi = require('./productSearch/combinedsearch');

var results = searchApi.search('Milch');
var dataSet = results;   //JSON.stringify(results,0,2);
main(dataSet, 2);

// mit Teststrings den Titel durchsuchen
function checkForAmount(title){

 var amount = 1;

 for(var i = 1; i < 15; i++){
     var testString = [i+' x', i+'x', i+'*', i+' *'];

     if(title.indexOf(testString) != -1){
         //console.log(String.indexOf(testString));
         amount = i;
         //console.log(String);
     }
 }
 return amount;
 }


// durchschnittspreis ausrechnen
function guesAvgPrice (dataSet) {
    console.log(JSON.stringify(dataSet,0,2));
    var i, y;
    var amount = 0;
    var tempprice = 0;

    for(y = 0; y <dataSet.length; y++) {
        for (i = 0; i < dataSet[y].itemInformation.length; i++) {


            if(dataSet[y].itemInformation[i].pricePerUnit !== '') {

                dataSet[y].itemInformation[i].usedPrice = parsePrice(dataSet[y].itemInformation[i].pricePerUnit);

            } else {
                dataSet[y].itemInformation[i].usedPrice = parsePrice(dataSet[y].itemInformation[i].price);
            }

            dataSet[y].itemInformation[i].titelAmount = checkForAmount(dataSet.itemInformation[i].title);

            if(dataSet[y].itemInformation[i].titelAmount > 1){
                dataSet[y].itemInformation[i].usedPrice = dataSet[y].itemInformation[i].usedPrice / dataSet[y].itemInformation[i].titelAmount;
            }

            tempprice = tempprice + dataSet[y].itemInformation[i].usedPrice;
            amount++;
        }
    }

    var avg = tempprice / amount;
    //console.log(avg);
    return avg;
}

function parsePrice(price){
    var currency = price;
    var tmpcurrency = currency.replace(',','.');
    var number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));

    return number;
}

function checkRange(price, range) {
    var extendedRange = 3 * range;
    var decreasedRange = range / 3;

    if(price >= extendedRange && price <= decreasedRange){
        return true;
    } else {
        return false;
    }
}

function main (dataSet, amount) {

    var avgprice = guesAvgPrice(dataSet);

    console.log(avgprice);

    for(var y = 0; y <dataSet.length; y++) {
        for (var i = 0; i < dataSet[y].itemInformation.length; i++) {
            if(checkRange(dataSet[y].itemInformation[i].usedPrice)) {
                delete dataSet[y].itemInformation[i].usedPrice;
            }
        }
    }

    var expectedPrice = avgprice * amount;

    console.log('Expected Price for Amount of '+amount+': '+expectedPrice);

    return dataSet;
}
