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
	currSem: {type: String, default: "freshOne"}

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


courseRoadSchema.methods.removeCourse = function(code, sem) {
	// for (var i = 0; i < this.sem.length; i++) {
	// 	if(this.sem[i] == code) {
	// 		this.sem.splice(i,1);
	// 		break;
	// 	}
	// }

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

	console.log("trana delete " + sem);

	for (var i = 0; i < focus.length; i++) {
		if(focus[i] == code) {
			focus.splice(i,1);
			break;
		}
	}

}

var CourseRoad = mongoose.model("CourseRoad", courseRoadSchema);

//export the model to make it available for use
module.exports = CourseRoad;