'use strict';

var express = require('express');
var controller = require('./validation.controller');

var router = express.Router();

router.post('/', controller.validate);


module.exports = router;