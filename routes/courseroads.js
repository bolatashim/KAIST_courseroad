var express = require("express");
var router = express.Router();

/* message to the console */

router.get("/", function(req, res, next) {

  console.log("Router courseroads is up \n");
  res.redirect("../");
});

module.exports = router;
