var express = require("express");

var router = express.Router();
var taskController = require("../Controller/taskController");
var Joi = require('joi');

var required = Joi.object().keys({
  name: Joi.string().required()
});

router.get("/list-task", function (req, res, next) {
  // res.send('respond with a resource');
  taskController.get_all(req, res);
});

router.post("/create-task", function (req, res, next) {
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
        taskController.add_task(req, res);
    }
  });
  
});
module.exports = router;
