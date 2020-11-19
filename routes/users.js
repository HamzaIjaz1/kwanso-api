var express = require('express');
var app = express();
var router = express.Router();
var userController = require('../Controller/userController');
var Joi = require('joi');

var required = Joi.object().keys({
  email: Joi.string().email().min(11).required(),
  password: Joi.string().min(8).required(),
});
var creds = Joi.object().keys({
  email: Joi.string().email().min(11).required(),
  password: Joi.string().min(8).required(),
});


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  Joi.validate(req.body, required, function (err, val) {
    if (err) {
      console.log(err);
      return res.send(
        JSON.stringify({
          status: 0,
          message: 'Invalid ' + err.details[0].path
        })
      );
    } else {
      userController.signup_user(req, res);
    }
  });
});


router.post('/signin', (req, res) => {
  Joi.validate(req.body, creds, function (err, val) {
    if (err) {
      console.log("error is", err.details[0].path);

      return res.send(
        JSON.stringify({
          status: 0,
          message: 'Invalid ' + err.details[0].path
        })
      );
    } else {
      userController.signin_user(req, res);
    }
  });
});

module.exports = router;