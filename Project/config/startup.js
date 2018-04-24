const MongoClient = require("mongodb").MongoClient;
const uuidv1 = require('uuid/v4');
const users = "usersData"
const diet = "diet"
const jsn = require("./6months.json");

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://localhost:27017/",
        database: "watchmynutrition"
    }
};


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
        avg: average
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

   /* var dietJack0 = dietDoc(userJack._id, "04/01/2018", 8, 5, 5, 6);
    var dietJack1 = dietDoc(userJack._id, "04/02/2018", 7, 6, 2, 5);
    var dietJack2 = dietDoc(userJack._id, "04/03/2018", 6, 9, 9, 8);
    var dietJack3 = dietDoc(userJack._id, "04/05/2018", 7, 5, 9, 7);
    var dietJack4 = dietDoc(userJack._id, "04/06/2018", 8, 5, 5, 6);
    var dietJack5 = dietDoc(userJack._id, "04/07/2018", 7, 5, 9, 7);
    var dietJack6 = dietDoc(userJack._id, "04/08/2018", 6, 9, 9, 8);
    var dietJack7 = dietDoc(userJack._id, "04/09/2018", 4, 7, 4, 5);
    var dietJack8 = dietDoc(userJack._id, "04/10/2018", 2, 10, 9, 7);*/

    var dietJack0 = dietDoc(userJack._id, "03/24/2018", 8, 5, 5, 6);
    var dietJack1 = dietDoc(userJack._id, "03/25/2018", 7, 6, 2, 5);
    var dietJack2 = dietDoc(userJack._id, "03/26/2018", 6, 9, 9, 8);
    var dietJack3 = dietDoc(userJack._id, "03/27/2018", 7, 5, 9, 7);
    var dietJack4 = dietDoc(userJack._id, "03/28/2018", 8, 5, 5, 6);
    var dietJack5 = dietDoc(userJack._id, "03/29/2018", 7, 5, 9, 7);
    var dietJack6 = dietDoc(userJack._id, "03/30/2018", 6, 9, 9, 8);
    var dietJack7 = dietDoc(userJack._id, "03/31/2018", 4, 7, 4, 5);
    var dietJack10 = dietDoc(userJack._id, "03/23/2018", 2, 10, 9, 7);
    var dietJack11 = dietDoc(userJack._id, "03/22/2018", 7, 6, 2, 5);
    var dietJack12 = dietDoc(userJack._id, "03/21/2018", 6, 9, 9, 8);
    var dietJack13 = dietDoc(userJack._id, "03/20/2018", 7, 5, 9, 7);
    var dietJack14 = dietDoc(userJack._id, "03/19/2018", 8, 5, 5, 6);
    var dietJack15 = dietDoc(userJack._id, "03/18/2018", 7, 5, 9, 7);
    var dietJack16 = dietDoc(userJack._id, "03/17/2018", 6, 9, 9, 8);
    var dietJack17 = dietDoc(userJack._id, "03/16/2018", 4, 7, 4, 5);
    var dietJack20 = dietDoc(userJack._id, "03/13/2018", 8, 5, 5, 6);
    var dietJack21 = dietDoc(userJack._id, "03/12/2018", 7, 6, 2, 5);
    var dietJack22 = dietDoc(userJack._id, "03/11/2018", 6, 9, 9, 8);
    var dietJack23 = dietDoc(userJack._id, "03/10/2018", 7, 5, 9, 7);
    var dietJack24 = dietDoc(userJack._id, "03/09/2018", 8, 5, 5, 6);
    var dietJack25 = dietDoc(userJack._id, "03/08/2018", 7, 5, 9, 7);
    var dietJack26 = dietDoc(userJack._id, "03/07/2018", 6, 9, 9, 8);
    var dietJack27 = dietDoc(userJack._id, "03/06/2018", 4, 7, 4, 5);
    var dietJack30 = dietDoc(userJack._id, "03/03/2018", 8, 5, 5, 6);
    var dietJack31 = dietDoc(userJack._id, "03/02/2018", 7, 6, 2, 5);
    var dietJack32 = dietDoc(userJack._id, "03/01/2018", 6, 9, 9, 8);
    var dietJack33 = dietDoc(userJack._id, "02/28/2018", 7, 5, 9, 7);
    var dietJack34 = dietDoc(userJack._id, "02/27/2018", 8, 5, 5, 6);
    var dietJack35 = dietDoc(userJack._id, "02/26/2018", 7, 5, 9, 7);
    var dietJack36 = dietDoc(userJack._id, "02/25/2018", 6, 9, 9, 8);
    var dietJack37 = dietDoc(userJack._id, "02/24/2018", 4, 7, 4, 5);
    var dietJack38 = dietDoc(userJack._id, "02/23/2018", 2, 10, 9, 7);
    var dietJack39 = dietDoc(userJack._id, "02/22/2018", 9, 9, 9, 9);
    
    var dietJack8 = dietDoc(userJack._id, "04/17/2018", 2, 10, 9, 7);
    var dietJack9 = dietDoc(userJack._id, "04/15/2018", 5, 5,5, 5);
    var dietJack18 = dietDoc(userJack._id, "04/14/2018", 6, 5, 6, 6);
    var dietJack19 = dietDoc(userJack._id, "04/13/2018", 9, 9, 9, 9);
    var dietJack28 = dietDoc(userJack._id, "04/12/2018", 7, 8, 8, 8);
    var dietJack29 = dietDoc(userJack._id, "04/11/2018", 9, 9, 9, 9);
    var dietJack40 = dietDoc(userJack._id, "04/16/2018", 2, 10, 9, 7);

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
    dietList.push(dietJack10);
    dietList.push(dietJack11);
    dietList.push(dietJack12);
    dietList.push(dietJack13);
    dietList.push(dietJack14);
    dietList.push(dietJack15);
    dietList.push(dietJack16);
    dietList.push(dietJack17);
    dietList.push(dietJack18);
    dietList.push(dietJack19);
    dietList.push(dietJack20);
    dietList.push(dietJack21);
    dietList.push(dietJack22);
    dietList.push(dietJack23);
    dietList.push(dietJack24);
    dietList.push(dietJack25);
    dietList.push(dietJack26);
    dietList.push(dietJack27);
    dietList.push(dietJack28);
    dietList.push(dietJack29);
    dietList.push(dietJack30);
    dietList.push(dietJack31);
    dietList.push(dietJack32);
    dietList.push(dietJack33);
    dietList.push(dietJack34);
    dietList.push(dietJack35);
    dietList.push(dietJack36);
    dietList.push(dietJack37);
    dietList.push(dietJack38);
    dietList.push(dietJack39);
    dietList.push(dietJack40);

    res = await userCollection.insertMany(usersList);
    usersins = await userCollection.find().toArray();
    // console.log(usersins);

    //insert and check if inserted
    res = await dietCollection.insertMany(dietList);
    dietins = await dietCollection.find().toArray();
    console.log(dietins);

    //dietins=  jsn;
    res = await dietCollection.insertMany(jsn);
    dietins = await dietCollection.find().toArray();
    console.log(dietins);


    return usersins;
    
}


var exports = module.exports = runSetup;