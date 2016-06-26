'use strict';

var searchApi = require('./productSearch/combinedsearch');

var results = searchApi.search('Milch');
var dataSet = results;   //JSON.stringify(results,0,2);
main(dataSet, 2);
/*
angular
  .module('listieMcListface')
  .factory('parseService', function () {
    return {
      parseAmount : function (data) {
          if(!data)  return 'no or wrong data';
          main(data);
      }
    };
});
*/
/**
 * 1. titel durchsuchen
 * 2. kategorie
 *   - wenn Lebensmittel -> price per Unit pflicht
 * 3. price bzw. price per unit überprüfen
 * 6. valide preise verrechnen zu einem Durchschnitt
 * 7. mit angegebener Menge verrechnen
 *   - Einheit überprüfen?
**/

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

// mit Teststrings den Titel durchsuchen
function checkForAmount(title){
 //TODO : put in validation file
    var amount = 1;

    for(var i = 1; i < 15; i++){
        var testString = [i+' x', i+'x', i+'*', i+' *'];

        for(var y = 0; y < testString.length; y++){
            if(title.indexOf(testString[y]) != -1){
                //console.log(String.indexOf(testString));
                amount = i;
                //console.log(String);
            }
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
// Preisstring mit Währungszeichen umwandeln


//überprüfen, ob der Preis in einer bestimmten Nähe zum AVG-preis liegt
function checkRange(price, range) {
    //TODO : put in validation file
    var extendedRange = 3 * range;
    var decreasedRange = range / 3;

    return !!(price >= extendedRange && price <= decreasedRange);
}
