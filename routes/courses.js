var express = require("express");

var router = express.Router();

/* print something to the console*/

router.get("/", function(req, res, next) {
  console.log("Courses router is up \n");
  res.redirect("../");
});


module.exports = router;
