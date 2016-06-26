'use strict';

var express = require('express');
var controller = require('./item.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.show);

router.get('/top', controller.top);

router.post('/', controller.create);

router.delete('/:id', controller.delete);


module.exports = router;