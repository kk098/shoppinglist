/**
 * Created by florianporada on 09.05.16.
 */
'use strict';

var fs = require('fs');
var request = require('request');

var options = {
    url: 'https://api.pons.com/v1/dictionary?q=casa&l=dees',
    headers: {
        'X-Secret': '42fb9ad885b2bb49d8f1d187ce969f4a98ecfd5a8c1a32f14bc2e9f8df5765e4'
    }
};

request(options, function (error, response, data) {
    if (error) { console.log(error, data); }
    if (!error && response.statusCode == 200) {
        console.log(data);
    }
});

var hello = function(name) {
    console.log('hello ' + name);
};


module.exports = hello;