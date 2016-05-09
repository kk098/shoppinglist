/**
 * Created by kathi on 05.05.16.
 */
// server.js

// set up ========================
var express  = require('express');
var app      = express();                   // create our app w/ express
var mongoose = require('mongoose');         // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var http = require('http');
var request = require("request");

// configuration =================
mongoose.connect('mongodb://localhost/shoppingList');

//Create a model to save data in mongodb
var Item = mongoose.model('Item', {
    amount: String,
    description: String,
    price: Number,
    log: String
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all items
app.get('/api/items', function(req, res) {

    // use mongoose to get all items in the database
    Item.find(function(err, items) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(items); // return all items in JSON format
    });
});

// create item and send back all items after creation
app.post('/api/items', function(req, res) {

    // create a item, information comes from AJAX request from Angular
    Item.create({
        amount: req.body.amount,
        description: req.body.description,
        price:req.body.price,
        log: req.body.log
    }, function(err, item) {
        if (err)
            res.send(err);

        // get and return all the items after you create another
        Item.find(function(err, items) {
            if (err)
                res.send(err)
            res.json(items);
        });
    });

});

// delete an item
app.delete('/api/items/:items_id', function(req, res) {
    Item.remove({
        _id : req.params.item_id
    }, function(err, item) {
        if (err)
            res.send(err);

        // get and return all the items after you create another
        Item.find(function(err, items) {
            if (err)
                res.send(err)
            res.json(items);
        });
    });
});

app.get('/api/search', function (req, res) {
request('http://www.amazon.de/s/ref=nb_sb_noss_2?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords=milch', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the URL.
    }
});
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle page changes on the front-end)
});
