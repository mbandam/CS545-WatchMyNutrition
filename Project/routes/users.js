const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const data = require("../data");
const userData = data.users;
const dietData=data.diet;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'watchmynuitrition',
  api_key: '266718785839255',
  api_secret: 'YoIwSpXNsaiRXNNB1EDp_gGmhOs'
});
var setCookie = require('set-cookie-parser');

passport.use(new Strategy(
  async function(username, password, cb) {
      console.log("user: pass:"+username+" "+password);
      var user= await userData.getUserbyUserId(username);
      if(!user){
          return cb(null, false, { message: 'Unknown User'});
      }
      var isMatch = await userData.comparePassword(password, user.hashedPassword);
      if(isMatch){
        return cb(null, user);
      } else {
            return cb(null, false, { message: 'Invalid password'});
      }

}));

passport.serializeUser( function(user, cb) {
    cb(null, user._id);
  });
  
passport.deserializeUser(async function(id, cb) {
  var user = await userData.getUser(id);
  cb(null, user);
  
});


router.get('/login',
function(req, res) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {      
    res.render('users/login', { message: req.flash('error') });    
    
  }else{
    res.redirect('/profile');  
  }
});
router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn("/"),
  async function (req, res) {
    let errors = [];
    
   try {
      
      res.render('users/profile', {
        errors: errors,
        hasErrors: false,
        updSuccess: false,
        user: req.user
      });
    }
    catch (e) {
      errors.push(e);
      res.render('users/profile', {
        errors: errors,
        hasErrors: true,
        updSuccess: false,
        user: req.user
      });
    }
  });

router.post("/profile", multipartMiddleware,async (req, res) => {
    let updatedProfileData = req.body;
  console.log("body: %j", req.body);
  let errors = [];
  

  if ((updatedProfileData.newPwd) || (updatedProfileData.newPwdConfirm)){
    if (updatedProfileData.newPwd !== updatedProfileData.newPwdConfirm){
    //console.log("Coming into if");
    errors.push("New Password and Confirm New Password don't match");
    }
  } 
  if (errors.length > 0) {
    //console.log("Inside errors.length if");
    res.render('users/profile', {
      errors: errors,
      hasErrors: true,
      updSuccess: false,
      user: updatedProfileData
    });
    return;
  }

  try {
    
    let updatedUserProfile = await userData.updateUser(updatedProfileData);
    res.render('users/profile', {
      errors: errors,
      hasErrors: false,
      updSuccess: true,
      user: updatedProfileData
    });
    return;
  }
  catch (e) {
    //console.log("Inside catch");
    //res.status(500).json({ error: e });
    errors.push(e);
    res.render('users/profile', {
      errors: errors,
      hasErrors: true,
      updSuccess: false,
      user: updatedProfileData
    });
  }
});

router.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn("/"),
  async function (req, res) {
    
   res.render('users/dashboard',{
    
    user: req.user,
  
    }
      );
    
  });

  
router.post('/dashboard',
  function (req, res) {

  });

router.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true }),
  function (req, res) {
    console.log('You are authenticated');
    res.redirect('/profile');
  });

router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});
// Register
router.get('/register', async function (req, res) {

  try {
    
    res.render('users/register',  );
  }
  catch (e) {
    response.status(500).json({ error: e });
  }
	
});

router.get('/graphs', require('connect-ensure-login').ensureLoggedIn("/"),
  async function (req, res) {
  res.render('users/graphs',
  {user: req.user});
});
// extra
router.get('/getGraphs', require('connect-ensure-login').ensureLoggedIn("/"),
async function (req, res) {

  console.log("get graphs");
  console.log(req.user._id);
  let docs= await dietData.getDietDataByUserId(req.user._id);
  
  console.log(docs);
  let datesArray = [];
    let nutritionValues = [];
  try {
    
    for ( index in docs){
      var doc = docs[index];
      //category array
      var date = doc['timestamp'].slice(0,5);
      //series 1 values array
      var nutritionAverage = doc['average'];
      
      datesArray.push({"label": date});
      nutritionValues.push({"value" : nutritionAverage});
     
    }
    var dataset = [
      {
        "seriesname" : "Nutrition Values",
        "data" : nutritionValues
      }
    ];

    var response = {
      "dataset" : dataset,
      "categories" : datesArray
    };
    res.json(response);
    //res.render('users/graphs',{data:response}  );
  }
  catch (e) {
    res.status(500).json({ error: e });
  }
	
});
// Register User
router.post('/register', multipartMiddleware, async function(req, res){

	// Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('gender', 'Gender is required').notEmpty().not().equals('Select Gender');
    req.checkBody('activity', 'activity level is required').notEmpty().not().equals('Select activity level');
    req.checkBody('occupation', 'Occupation is required').notEmpty().not().equals('Select Occupation');
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('weight', 'Weight is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('dob', 'Date of birth is required and should be a date').notEmpty();
    req.checkBody('location', 'Location is required').notEmpty();
    req.checkBody('user_id', 'Username is required').notEmpty();
	  req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();
  
  
  if(req.body.user_id){
    user=await userData.getUserbyUserId(req.body.user_id);
    if(user){
        console.log("Username "+user.name+" already exists");
        //let errorMessage="Username already exists";
        let error_msg={"msg" :"Username already exists",
        "param":"user_id" };
        if(!errors){
          errors=[];
          errors.push(error_msg);
          //console.log(typeof(errors));
        }else{
          errors.push(error_msg);
        }
    }
}
	if(errors){

    var errors_user={
      name:req.body.name ,
      user_id:req.body.user_id,
      password:req.body.password,
      password2:req.body.password2,
      dob:req.body.dob,
      gender:req.body.gender,
      location:req.body.location,
      occupation:req.body.occupation,
      activity:req.body.activity,
      email:req.body.email ,
      weight:req.body.weight
    };

    
    res.render('users/register', {errors:errors,user:errors_user} );


  } else {
    
    const newUser = {
      user_id: req.body.user_id,
      hashedPassword: "",
      password: req.body.password,
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      location: req.body.location,
      occupation: req.body.occupation,
      email: req.body.email,
      activity:req.body.activity,
      weight:req.body.weight
    };
    addedUser=await userData.addUser(newUser,newUser.password);
    console.log("added new user");
    console.log(addedUser);
    
    req.flash('success_msg', 'You are registered and can now login');
    res.redirect('/users/login');  
    
	}
});
module.exports = router;