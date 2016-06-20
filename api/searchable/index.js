'use strict';

var express = require('express');
var controller = require('./searchable.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/:string', controller.match);

router.post('/', controller.create);


module.exports = router;