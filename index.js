//************** Establishing Connection Pools for users  *******************  */

const app = require('./server.js'); // Import the server that we created 
const express = require('express')
const dotenv = require('dotenv');
const path = require('path')
dotenv.config();
const PORT = process.env.PORT || 5500;
const ReviewsDAO = require("./dao/reviewsDAO.js");
const MongoClient = require('mongodb').MongoClient;
const clientOptions = {
    maxPoolSize: 50, // 50 open connections in the cach
    waitQueueTimeoutMS: 2500, // How long will we check out a connection from the pool before timing out. How long do we try to connect to the db before we timeout and call it a failed connection 
    useNewUrlParser: true // Parses the datadb uri into a string 
};

console.log(process.env.DB_URL);

// Enviormental Variables
const mongo_userName = process.env.DB_USERNAME;
const mongo_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${mongo_userName}:${mongo_password}@hellyeagamez.cseymkn.mongodb.net/`;

MongoClient.connect(uri, clientOptions).catch((err)=>{
    console.error("Can't connect to the DB server");
    process.exit(1);
    // We pass over the connection which is the URI which is injected with the appropriate username and password. Now we want to add data to this database
}).then( async (connection)=>{

    // Pass the client/user over to ReviewsDAO and transfer the database connection over to that file
    await ReviewsDAO.injectDB(connection);
    

    app.listen(PORT, ()=>{
        console.log(`Listening on port: ${PORT}`);
    })
});
