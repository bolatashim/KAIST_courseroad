//course info to be kept in MongoDB
//mongoose to define schema
var mongoose = require("mongoose");

//course schema
var courseSchema = mongoose.Schema({

  code: {type: String, required: true},
  title: {type: String, required: true},
  depcode: {type: Number, required: true},
  type: {type: String, required: true},
  llc: {type: String, required: true},
  year: {type: String},
  semester: {type: String}

});

//a method to get the course id
courseSchema.methods.getid = function() {
  return this._id;
};

var Course = mongoose.model("Course", courseSchema);

//export the model to make it available for use
module.exports = Course;
