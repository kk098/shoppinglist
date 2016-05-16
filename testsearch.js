/**
 * Created by kathi on 16.05.16.
 */
var searchApi = require('./combinedsearch');

var results = searchApi.search('mehl');

console.log(JSON.stringify(results,0,2));