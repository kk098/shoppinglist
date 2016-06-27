'use strict';

var express = require('express');
var controller = require('./cache.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.show);

router.get('/match/:string', controller.match);

router.post('/', controller.create);


module.exports = router;