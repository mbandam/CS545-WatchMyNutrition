const express = require('express');
const router = express.Router();
const dietData = require("../data/diet");
const userData = require("../data/users");

/* router.post('/diet', multipartMiddleware, async function(req, res){

    res.render('users/dashboard');
    const newDiet = {
        meal: req.body.meal
      };
      console.log(newDiet);
      
      req.flash('success_msg', 'You are registered and can now login');
      res.redirect('/users/login');  
});

*/

var express = require('express'),
    app = express();

app.use(express.bodyParser());

// as only one page can use res.sendfile to render the page which will contain the drop   downs
app.get('/', function (req, res) {
    res.sendfile('views/users/dashboard');
});

app.get('/getMeal', function (req, res) {
    // If it's not showing up, just use req.body to see what is actually being passed.
    console.log(req.body.meal);
});