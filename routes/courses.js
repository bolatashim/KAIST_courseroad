var express = require("express");

var router = express.Router();

var Course = require("../models/course");
/* print something to the console */

router.get("/", function(req, res, next) {
  console.log("Courses router is up \n");
  next();
});

/* Making and adding course object to my database. To work with the requests sent through Java*/

router.post("/add", function(req, res) {
	console.log(req.body.title);
	res.send(req.body);

	var newCourse = new Course({
		title: req.body.title,
		code: req.body.code,
		depcode: req.body.depcode,
		creditnum: req.body.creditnum,
		type: req.body.type,
		AU: req.body.AU
	});
	newCourse.save();
});

module.exports = router;
