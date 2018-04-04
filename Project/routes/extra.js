const express = require('express');
const router = express.Router();
const dietData = require("../data/diet");
const userData = require("../data/users");

router.get('/extra', ensureLogIn.ensureLoggedIn('/'), (req, res) => {
    dietData.getDietDataByUserId(req.user._id).then((usersDiet) => {
        res.render('extra', { usersDiet: usersDiet, user: req.user });
    }, (error) => {
        res.render('extra', { hasError: true, user: req.user });
    });
});