'use strict';

var searchApi = require('./combinedsearch');

var results = searchApi.search('Milch');
var dataSet = results;   //JSON.stringify(results,0,2);
parseAmount(dataSet, 2);


// Price / pricePerUnit = (int) erg
// ohne pricePerUnit => errorlog | titlesearch


// mit Teststrings den Titel durchsuchen
/*function checkForAmount(){
 var String = data[1].title;
 var amount = 1;
 for(var i = 1; i < 15; i++){
 var testString = i + ' x';

 if(String.indexOf(testString) != -1){
 //console.log(String.indexOf(testString));
 amount = i;
 //console.log(String);
 }
 }
 return amount;
 }
 */
// durchschnittspreis ausrechnen
function guesAvgPrice(dataSet){
    var i, y;
    var amount = 0;
    var tempprice = 0;
    for(y = 0; y <dataSet.length; y++) {
        for (i = 0; i < dataSet[y].itemInformation.length; i++) {
            if(dataSet[y].itemInformation[i].pricePerUnit !== ''){
                var currency = dataSet[y].itemInformation[i].pricePerUnit;
                var tmpcurrency = currency.replace(',','.');
                var number = Number(tmpcurrency.replace(/[^0-9\.]+/g, ""));

                if(amount !== 0 && tempprice !== 0) {
                    var bis = (tempprice / amount);
                    console.log(tempprice);
                    console.log(amount);
                    console.log(number);
                    console.log('Range Bis : '+ bis);

                    if (number < bis) {
                        tempprice = tempprice + number;
                        amount++;
                    }
                } else {
                    if (tempprice !== 0) {
                        var bis = 3 * tempprice;
                        if (number < bis) {
                            tempprice = tempprice + number;
                            amount++;
                        }
                    } else {
                        tempprice = tempprice + number;
                        amount++;
                    }
                }
            } else {
                //var currency = dataSet[y].itemInformation[i].price;
            }
        }
    }
    var avg = tempprice / amount;
    //console.log(avg);
    return avg;
}

function parseAmount(dataSet, amount){
    var avgprice = guesAvgPrice(dataSet);
    console.log(avgprice);

    var expectedPrice = avgprice * amount;
    console.log('Expected Price for Amount of '+amount+': '+expectedPrice);
}

//var amount = checkForAmount();
//console.log(amount);
//var average = guesAmount();
// var moneydifference = checkweight(data[0], data[1]);

/*
 // Produktgröße in relation zum Preis Vergleichen | 2 Einträge jeweils
 function checkweight(object1,object2) {
 var diff = object2.weight / object1.weight;

 var moneydiff = object2.price - (object1.price * diff);
 console.log(moneydiff);
 return moneydiff;
 }
 */
