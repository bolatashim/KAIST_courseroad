var express = require("express");
var passport = require("passport");

var User = require("../models/user");
var CourseRoad = require("../models/courseroad");
var Course = require("../models/course");
var Major = require("../models/major");

var router = express.Router();


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in.");
    res.redirect("/login");
  }
}

/*
function getTitles(objectids) {
  var titles = [];
  for (var i = 0; i < objectids.length; i++) {
    Course.findById(objectids[i].toString(), function(err, course) {
      if (err) throw err;
      titles.push(course.code);

      console.log(course.code + " " + titles.length);
      if (i == objectids.length) {
        return titles;
      }
    });
  }
  return titles;
}
*/


router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


router.get("/", function(req, res, next) {
  if (req.user) {

    CourseRoad.findById(req.user.crId, function(err, cr) {
      if (err) throw err;
      

      /*

      //Could not manage to make the code below work ㅠㅠㅠㅠ

      var mycourses = [];

      for (var i = 0; i < cr.freshOne.length; i++) {
        Course.findById(cr.freshOne[i], function(err, course) {
          if (err) throw err;
          //console.log(course.code.toString());
          mycourses[mycourses.length] = course.code;
          mycourses[mycourses.length] = course.type;
          console.log(cr.freshOne.length);

        });
      }
        res.render("index", { freshOne: mycourses });

      */

      if (!cr) { //if a courseroad not found

        req.flash("error", "Unable to find a courseroad for " + req.user.username);
        res.redirect("/");

      } else {

        Major.findById(req.user.majorId.toString(), function(err, myMajor){

          if (err) {
            console.log("getting an error when trying to find the major by ID");
          }



          res.render("index", {
      
          freshOne: cr.freshOne,
          freshTwo: cr.freshTwo,
          sophOne: cr.sophOne,
          sophTwo: cr.sophTwo,
          junOne: cr.junOne,
          junTwo: cr.junTwo,
          senOne: cr.senOne,
          senTwo: cr.senTwo,
          extraOne: cr.extraOne,
          extraTwo: cr.extraTwo,
          extraThree: cr.extraThree,
          extraFour: cr.extraFour,
          currSem: cr.currSem,
          semcodes: ["freshOne", "freshTwo", "sophOne", "sophTwo", "junOne", "junTwo", "senOne", "senTwo", "extraOne"],
          semtitles: ["Freshman 1", "Freshman 2", "Sophomore 1", "Sophomore 2", "Junior 1", "Junior 2", "Senior 1", "Senior 2", "Extra"],
          majorCourses: myMajor.majorReq,
          majorTitle: myMajor.title,
          majorYear: myMajor.year,
          allSems: cr.freshOne.concat(cr.freshTwo).concat(cr.sophOne).concat(cr.sophTwo).concat(cr.junOne).concat(cr.junTwo).concat(cr.senOne).concat(cr.senTwo).concat(cr.extraOne)

        }); 



        });






      }

    });

  } else { // No user is logged in, so just show an empty courseroad
        
        res.render("index", {

          freshOne: ["hi"],
          freshTwo: ["there"],
          sophOne: [],
          sophTwo: [],
          sophOne: [],
          junTwo: [],
          junOne: [],
          senTwo: [],
          senOne: [],
          extraOne: [],
          extraTwo: [],
          extraThree: [],
          extraFour: [],
          currSem: "freshOne",
          semcodes: ["freshOne", "freshTwo", "sophOne", "sophTwo", "junOne", "junTwo", "senOne", "senTwo", "extraOne"],
          semtitles: ["Freshman 1", "Freshman 2", "Sophomore 1", "Sophomore 2", "Junior 1", "Junior 2", "Senior 1", "Senior 2", "Extra"],
          majorCourses: [],
          majorTitle: "Sample title",
          majorYear: 2015,
          allSems: []


        });
  }

});


router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;


  //need to add major thing here so one can select their major

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    //Whenever a user is created a corresponding courseroad Object is created that we soon would use to add courses to
    var newCourseRoad = new CourseRoad({});
    newCourseRoad.save();

    Major.findOne({"title": "cs"}, function(err, major) {
      console.log("do I even find myself here?");
      //We save the id of our brand new courseroad in the crId field of our user
      

    
      var newUser = new User({
        username: username,
        password: password,
        crId: newCourseRoad.getid(),
        majorId: major.getid()
      });
      newUser.save(next);

    });



  });

}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));

router.get("/users/:username", function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    res.render("profile", { user: user });
  });
});


router.get("/edit", ensureAuthenticated, function(req, res) {
  res.render("edit");
});

router.post("/edit", ensureAuthenticated, function(req, res, next) {
  req.user.displayName = req.body.displayname;
  req.user.bio = req.body.bio;
  req.user.save(function(err) {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Profile updated!");
    res.redirect("/edit");
  });
});


router.post("/testForm", ensureAuthenticated, function(req, res, next) {
  
  /* First we find the courseroad object of the user so we could add classes to that specific courseroad */
  CourseRoad.findById(req.user.crId.toString(), function(err, cr) {
    if (err) throw err;
    if (!cr) { /* if cr not found, say that to the user */
      req.flash("error", "Unable to find a courseroad for " + req.user.username);
      res.redirect("/");
    } else { /* found the cr can go on to check the course */

      /* Once a post req received, I try to find the particular course in my database */
      Course.findOne({"code": req.body.code.toString()}, function(err, course) {
        if (err) {
          
          console.log("Oops! an error in finding the course portion");
          res.redirect("/");
          return;

        } else if (!course) { //if the course is not found tell me about that
          
          console.log("Course not found !!!");
          req.flash("error", "The course was not found! Such a course does not exist or is not offered at this time. Make sure the code is written correctly.");
          res.redirect("/");

        } else {

          /* Having failed to figure how to treat the id's, decided to switch to strings for now. Need to change that later */
          //var courseToBeAdded = course.code;
          
          var courseToBeAdded = course.code + "!" + course.title + "!" + course.type + "!" + course.creditnum + "!" + course.AU;
          
          /* Checking if this course is already in my courses list */
          if (cr.freshOne.includes(courseToBeAdded) || cr.freshTwo.includes(courseToBeAdded) || cr.sophOne.includes(courseToBeAdded) || cr.sophTwo.includes(courseToBeAdded) || cr.junOne.includes(courseToBeAdded) || cr.junTwo.includes(courseToBeAdded) || cr.senOne.includes(courseToBeAdded) || cr.senTwo.includes(courseToBeAdded) || cr.extraOne.includes(courseToBeAdded) || cr.extraTwo.includes(courseToBeAdded) || cr.extraThree.includes(courseToBeAdded) || cr.extraFour.includes(courseToBeAdded)) {
            
            /* if so, inform the user and get back to where we started */
            console.log("The course requested is not in the database.. ");
            req.flash("error", "The course is already there");
            res.redirect("/");

          } else { //we found the course to add and confirmed that it was not added previously, so we an go on to add it to our list
                
                /* just saying cr.section.push(courseToBeAdded) does not work so need to check all */
                var section = req.body.section;
                cr.currSem = section;
                console.log(section);
                switch(section) {
                  case "freshOne":
                    cr.freshOne.push(courseToBeAdded);
                    break;

                  case "freshTwo":
                    cr.freshTwo.push(courseToBeAdded);
                    break;

                  case "sophOne":
                    cr.sophOne.push(courseToBeAdded);
                    break;

                  case "sophTwo":
                    cr.sophTwo.push(courseToBeAdded);
                    break;

                  case "junOne":
                    cr.junOne.push(courseToBeAdded);
                    break;

                  case "junTwo":
                    cr.junTwo.push(courseToBeAdded);
                    break;

                  case "senOne":
                    cr.senOne.push(courseToBeAdded);
                    break;

                  case "senTwo":
                    cr.senTwo.push(courseToBeAdded);
                    break;

                  case "extraOne":
                    cr.extraOne.push(courseToBeAdded);
                    break;

                  case "extraTwo":
                    cr.extraTwo.push(courseToBeAdded);
                    break;

                  case "extraThree":
                    cr.extraThree.push(courseToBeAdded);
                    break;

                  case "extraFour":
                    cr.extraFour.push(courseToBeAdded);
                    break;
                }

                /* Saving the changes in the courseroad */
                cr.save(function(err) {
                  if (err) {
                    next(err);
                    return;
                  }
                  req.flash("info", "Course Added");
                  res.redirect("/");
                });
          }
        }
      });
    }
  });
});



router.post("/courseDelete", ensureAuthenticated, function(req, res, next) {

  CourseRoad.findById(req.user.crId.toString(), function(err, cr) {
    if (err) throw err;
    if (!cr) { /* if cr not found, say that to the user */
      req.flash("error", "Unable to find a courseroad for " + req.user.username);
      res.redirect("/");
    } else { /* found the cr can go on to check the course */

      cr.removeCourse(req.body.code, req.body.semester); 
      /* Saving the changes in the courseroad */
      cr.save(function(err) {
        if (err) {
          next(err);
          return;
        }
        req.flash( "Course Deleted");
        res.redirect("/");
      });
    }
  });



});

module.exports = router;
