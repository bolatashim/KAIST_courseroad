var express = require("express");

var router = express.Router();

var Major = require("../models/major");
/* print something to the console */

router.get("/", function(req, res, next) {
  console.log("Majors router is up \n");
  //res.redirect("../");
  next();
});

/* Making and adding course object to my database. To work with the requests sent through Java*/

router.post("/add", function(req, res) {

	console.log("Hello people :D");


	console.log(req.body.title);
	res.send(req.body);

	var courses = req.body.courses;
	var ourCourses = [];

	console.log(courses.length);
	for (var i = 0; i < courses.length; i++) {
		ourCourses.push(courses[i]["course"]);
	}

	console.log(ourCourses.length + " is our new length");


	var newMajor = new Major({
		year: req.body.year,
		title: req.body.title,
		majorReq: ourCourses
	});



	newMajor.save();
});

module.exports = router;
