var express = require("express");

var router = express.Router();

var Course = require("../models/course");
/* print something to the console */

router.get("/", function(req, res, next) {
  console.log("Courses router is up \n");
  //res.redirect("../");
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
		llc: req.body.llc,
		type: req.body.type,
		year: req.body.year,
		semester: req.body.semester
	});
	newCourse.save();
});

module.exports = router;
