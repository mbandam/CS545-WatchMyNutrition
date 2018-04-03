const uuidv1 = require('uuid/v4');
const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const mongoCollections = require("../config/mongoCollections");
const dietType = mongoCollections.diet;
var ObjectID = require('mongodb').ObjectID;
var bcrypt = Promise.promisifyAll(require("bcrypt"));

let exportedmethods = {
   
    //async dieting ( meal, type, scale) {
    //    if(!meal && !type && !scale)
    //        return ""
    // },

    async userDietType (meal) {

                const dietCollection = await dietType();
        
                const newUser = {
                    mealType: meal.meal

                };
                console.log(newUser);
            }
    
}

module.exports = exportedMethods;