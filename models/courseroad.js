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
	extraFour: [String],
	majorReqs: [String],
	currSem: {type: String, default: "freshOne"}
});

//A method to get the courseroad id
courseRoadSchema.methods.getid = function() {
	return this._id;
};


courseRoadSchema.methods.removeCourse = function(code, sem) {

	var focus = this.freshOne;

	switch(sem) {
		case "freshTwo":
		focus = this.freshTwo;
		break;
		case "sophOne":
		focus = this.sophOne;
		break;
		case "sophTwo":
		focus = this.sophTwo;
		break;
		case "junOne":
		focus = this.junOne;
		break;
		case "junTwo":
		focus = this.junTwo;
		break;
		case "senOne":
		focus = this.senOne;
		break;
		case "senTwo":
		focus = this.senTwo;
		break;
		case "extraOne":
		focus = this.extraOne;
		break;
	}

	for (var i = 0; i < focus.length; i++) {
		if(focus[i].split("!")[0] == code) {
			focus.splice(i,1);
			break;
		}
	}
}

var CourseRoad = mongoose.model("CourseRoad", courseRoadSchema);

//export the model to make it available for use
module.exports = CourseRoad;