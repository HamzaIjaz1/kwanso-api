var express = require('express');

var router = express.Router();
var userController = require('../Controller/userController');


router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    userController.get_user(req.info,res);
  });

  module.exports = router;