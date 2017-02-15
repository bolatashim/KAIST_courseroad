//courseRoad data to be kept in MongoDB
//mongoose to define schema
var mongoose = require("mongoose");

//var Course = require("./course");
//rough schema
var courseRoadSchema = mongoose.Schema({

	/* For now, each user will have only one courseroad. Later, I will add two more (the commented part below) */
	freshOne: [String],
	freshTwo: [String],
	sophOne: [String],
	sophTwo: [String],
	sophOne: [String],
	junTwo: [String],
	junOne: [String],
	senTwo: [String],
	senOne: [String],
	extraOne: [String],
	extraTwo: [String],
	extraThree: [String],
	extraFour: [String]

	/*  
	planOne: {
		  freshOne: [String],
		  freshTwo: [String],
		  sophOne: [String],
		  sophTwo: [String],
		  sophOne: [String],
		  junTwo: [String],
		  junOne: [String],
		  senTwo: [String],
		  senOne: [String],
		  extraOne: [String],
		  extraTwo: [String],
		  extraThree: [String],
		  extraFour: [String]
		},
	planTwo: {
		  freshOne: [String],
		  freshTwo: [String],
		  sophOne: [String],
		  sophTwo: [String],
		  sophOne: [String],
		  junTwo: [String],
		  junOne: [String],
		  senTwo: [String],
		  senOne: [String],
		  extraOne: [String],
		  extraTwo: [String],
		  extraThree: [String],
		  extraFour: [String]
		},
	planThree: {
		  freshOne: [String],
		  freshTwo: [String],
		  sophOne: [String],
		  sophTwo: [String],
		  sophOne: [String],
		  junTwo: [String],
		  junOne: [String],
		  senTwo: [String],
		  senOne: [String],
		  extraOne: [String],
		  extraTwo: [String],
		  extraThree: [String],
		  extraFour: [String]
		}
	*/
});

//A method to get the courseroad id
courseRoadSchema.methods.getid = function() {
	return this._id;
};

var CourseRoad = mongoose.model("CourseRoad", courseRoadSchema);

//export the model to make it available for use
module.exports = CourseRoad;