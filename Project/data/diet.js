const uuidv1 = require('uuid/v4');
const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const mongoCollections = require("../config/mongoCollections");
const dietType = mongoCollections.diet;
var ObjectID = require('mongodb').ObjectID;
var bcrypt = Promise.promisifyAll(require("bcrypt"));

let exportedmethods = {

    async getDatesinRangeForUser(userId, dates) {
        if (!userId) {
            throw "user id cannot be null";
        }
        if (!dates) {
            throw "dates cannot be null";
        }
        if (dates.length == 0) {
            throw "dates cannot be empty";
        }
        const dietCollection = await dietType();
        const dietOfUser = await dietCollection.find({
            $and: [
                // {location_pref:{ $in: user.location_pref }},
                { "user_id": userId },
                { timestamp: { $in: dates } },

            ]

        }).sort({ timestamp: 1 }).toArray();
        return dietOfUser;



    },

    //async dieting ( meal, type, scale) {
    //    if(!meal && !type && !scale)
    //        return ""
    // },
    async getDietDataByUserId(userId) {
        if (!userId) {
            throw "Error occurred !! Invalid user !!";
        }
        const dietCollection = await dietType();
        const dietOfUser = await dietCollection.find({ "user_id": userId }).sort({ timestamp: -1 }).toArray();
        return dietOfUser;
    },

    async get(user_id, timestamp) {
        let dietCollection = await dietType();
        data = await dietCollection.findOne({ "user_id": user_id, "timestamp": timestamp });
        if (data)
            return data;
        else return undefined;
    },

    async insert(meal) {
        const dietCollection = await dietType();
        meal.breakfast = 0;
        meal.lunch = 0;
        meal.dinner = 0;
        switch (meal.meal) {
            case "breakfast":
                meal.breakfast = meal.range;
                break;
            case "lunch":
                meal.lunch = meal.range;
                break;
            case "dinner":
                meal.dinner = meal.range;
                break;
        }
        meal.avg = Math.round(meal.range / 3);
        const data = await dietCollection.insertOne(meal);
        if (data.insertedCount == 0)
            throw "Error insterting data";
        return meal;
        console.log(meal);
    },

    async update(meal) {
        const dietCollection = await dietType();
        switch (meal.meal) {
            case "breakfast":
                meal.breakfast = meal.range;
                break;
            case "lunch":
                meal.lunch = meal.range;
                break;
            case "dinner":
                meal.dinner = meal.range;
                break;
        }
        meal.avg = Math.round((meal.dinner + meal.lunch + meal.breakfast) / 3);
        const data = await dietCollection.updateOne({ _id: meal._id }, { $set: meal });
        return data;
    }
}

module.exports = exportedmethods;
