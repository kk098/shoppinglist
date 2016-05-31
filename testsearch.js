/**
 * Created by kathi on 16.05.16.
 */
var searchApi = require('./combinedsearch');

var results = searchApi.search('shampoo');

console.log(JSON.stringify(results,0,2));

