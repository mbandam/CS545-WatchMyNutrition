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
      
});

var express = require('express'),
    app = express();

app.use(express.bodyParser());

app.get('/', function (req, res) {
    res.sendfile('views/users/dashboard');
});

app.get('/getMeal', function (req, res) {
    console.log(req.body.meal);
});

*/

var formatDateComponent = function(dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
  };
  
  var formatDate = function(date) {
    return formatDateComponent(date.getMonth() + 1) + '/' + formatDateComponent(date.getDate()) + '/' + date.getFullYear();
  };

router.post('/getMeal', async (req, res, next) => {
    let x=new Date();
    let timestamp=formatDate(x);
    //timestamp.setHours(0,0,0,0);
    console.log(req.body.myRange);
    let meal = {
        user_id: req.user._id,
        meal: req.body.meal,
        timestamp:timestamp,
        range: parseInt(req.body.myRange, 10),
        foodType: req.body.foodType
    }    
    try {
        let data=await dietData.get(timestamp);
        
        if(data){
            data.meal=meal.meal;
            data.range=meal.range;
            data=await dietData.update(data);
        }
        else 
            data = await dietData.insert(meal);
        //res.json({ "meal": data });
        next();
    }
    catch (error) {
        res.json({ "error": error })
    }
}); 



module.exports = router;
