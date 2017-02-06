//course info to be kept in MongoDB
//mongoose to define schema
var mongoose = require("mongoose");

//rough schema
var courseSchema = mongoose.Schema({


  code: {type: String, required: true},
  number: {type: String, required: true},
  title: {type: String, required: true},
  dep: {type: String, required: true},
  type: {type: String, required: true},
  lecture: {type: Number, required: true},
  lab: {type: Number, required: true},
  credit: {type: Number, required: true},
  year: {type: Number, default: 0},
  semester: {type: String, required: true}

});

//no methods yet


var Course = mongoose.model("Course", courseSchema);

//export the model to make it available for use
module.exports = Course;