const express = require('express');
const router = express.Router();
const dietData = require("../data/diet");
const userData = require("../data/users");
const dietDataCollection = require("../config/mongoCollections").diet;

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

router.post('/getMeal', async (req, res, next) => {
    let timestamp=new Date().toISOString().slice(0,10);
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
        let dietCollection = await dietDataCollection();
        data = await dietCollection.findOne({"user_id": meal.user_id ,"timestamp":meal.timestamp});
        //let data=await dietData.get(timestamp);
        if(data){
            data.meal=meal.meal;
            data.range=meal.range;
            data=await dietData.update({"meal": data.meal, "range": data.range});
        }
        else 
            data = await dietData.insert(meal); 
        res.json({ "meal": data });
        //next();
    }
    catch (error) {
        res.json({ "error": error })
        console.log(error);
    }
}); 

module.exports = router;