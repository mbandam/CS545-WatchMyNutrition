const MongoClient = require("mongodb").MongoClient;
const uuidv1 = require('uuid/v4');
const users = "usersData"
const diet = "diet"

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://localhost:27017/",
        database: "watchmynutrition"
    }
};

//NM - added email
var makeDoc = function (user_id, name, hashedPassword, dob, gender, location, occupation, activity,
     email,weight) {
    return {
        //_id: uuidv1(),
        user_id: user_id,
        name: name,
        hashedPassword: hashedPassword,
        dob: dob,
        gender: gender,
        location: location,
        occupation: occupation,
        email: email,
        weight:weight

    }
};


//create diet
var dietDoc = function (user_id, timestamp, breakfast, lunch, dinner, average) {
    return {
        user_id: user_id,
        timestamp: timestamp,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        average: average
    }
}


let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined


async function runSetup() {

    // create db connection
    const db = await MongoClient.connect(fullMongoUrl);

    // adding travel data seed
    //NM - Commenting the below collection drop line as starting the application gives 'MongoError: ns not found' error
    //NM - According to lecturer's code dropping the database rather than a specific collection.
    //await db.collection(travel).drop();
    await db.dropDatabase();
    
    userCollection = await db.createCollection(users);

    var userJack = makeDoc("jack_d", "Jack Dawson", "", "01/01/1990", "M", "Hoboken", "1","1",  "jack_d@gmail.com",150);
    userJack.hashedPassword = "$2a$16$mEbkQxGZt3a/qidjcCb6O..ah9yyDlGRj2lWpSK/ebQJJjSp1ISmS";
    userJack._id ="245b3e48-f959-464b-9615-b07d187d78a8";
    
    //password: password

    var userRose = makeDoc("rose_d", "Rose Dewitt", "", "11/03/1995", "F", "Hoboken", "1","1","rose_d@gmail.com",130);
        
    userRose.hashedPassword = "$2a$16$biOzgZ.pj1lMO.sRg5MFZuAXLm5FCiWIuDu3hBO6.QXlEwrImJ28W";
    userRose._id="fc650072-441c-43f0-b50d-d681294488c5";    
    //password: password2

    userlily = makeDoc("lilly", "Lilly Evans", "", "11/27/1989", "F", "Jerseycity", "Student","2","2","lilly_evans123@gmail.com",160);
    userlily._id="ea8cbd84-3e7f-48e6-a728-9fa314e943a1";


    usersList = [];
    usersList.push(userJack);
    usersList.push(userRose);
    usersList.push(userlily);

    dietCollection = await db.createCollection(diet);

    var dietJack0 = dietDoc("jack_d", "03/24/2018", 8, 5, 5, 6);
    var dietJack1 = dietDoc("jack_d", "03/25/2018", 7, 6, 2, 5);
    var dietJack2 = dietDoc("jack_d", "03/26/2018", 6, 9, 9, 8);
    var dietJack3 = dietDoc("jack_d", "03/27/2018", 7, 5, 9, 7);
    var dietJack4 = dietDoc("jack_d", "03/28/2018", 8, 5, 5, 6);
    var dietJack5 = dietDoc("jack_d", "03/29/2018", 7, 5, 9, 7);
    var dietJack6 = dietDoc("jack_d", "03/30/2018", 6, 9, 9, 8);
    var dietJack7 = dietDoc("jack_d", "03/31/2018", 4, 7, 4, 5);
    var dietJack8 = dietDoc("jack_d", "04/01/2018", 2, 10, 9, 7);
    var dietJack9 = dietDoc("jack_d", "04/02/2018", 9, 9, 9, 9);

    dietList = [];
    dietList.push(dietJack0);
    dietList.push(dietJack1);
    dietList.push(dietJack2);
    dietList.push(dietJack3);
    dietList.push(dietJack4);
    dietList.push(dietJack5);
    dietList.push(dietJack6);
    dietList.push(dietJack7);
    dietList.push(dietJack8);
    dietList.push(dietJack9);

    
    res = await userCollection.insertMany(usersList);
    usersins = await userCollection.find().toArray();
    // console.log(usersins);

    //insert and check if inserted
    res = await dietCollection.insertMany(dietList);
    dietins = await dietCollection.find().toArray();
    //console.log(dietins);


    return usersins;
    
}


var exports = module.exports = runSetup;