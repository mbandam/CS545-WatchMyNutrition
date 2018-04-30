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

var formatDateComponent = function (dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
};

var formatDate = function (date) {
    return formatDateComponent(date.getMonth() + 1) + '/' + formatDateComponent(date.getDate()) + '/' + date.getFullYear();
};

router.post('/addMeal', async (req, res, next) => {
    const x = new Date(req.body.datepicker);
    let timestamp = formatDate(x);

    //timestamp.setHours(0,0,0,0);
    //console.log(req.body.myRange);
    let meal = {
        user_id: req.user._id,
        meal: req.body.meal,
        timestamp: timestamp,
        range: parseInt(req.body.myRange, 10),
        foodType: req.body.foodType,
        weight: req.body.weight
    }
    try {
        await userData.updateUser({ _id: meal.user_id, weight: meal.weight });
        let data = await dietData.get(meal.user_id, meal.timestamp);
        if (data) {
            data.meal = meal.meal;
            data.range = meal.range;
            data.weight = meal.weight;
            data = await dietData.update(data);
        }
        else
            data = await dietData.insert(meal);
        let msg = "Succesfully submitted value " + meal.range + " for " + meal.meal;
        req.flash('success_msg', msg);
        //res.json({ "meal": data });
        next();
    }
    catch (error) {
        res.json({ "error": error })
        console.log(error);
    }
});

module.exports = router;