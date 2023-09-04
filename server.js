//*********************** MAIN SERVER ***********************  */

//          IMPORTS
const express = require('express');
const path = require('path');
const app = express(); // Creates our main server 
const cors = require('cors'); // Allows us to grab resources from other remote locations such as we are grabbing (getting) movies from TMDB.
const reviews = require('./api/reviews.route.js');


//          MIDDLEWARE - These functions have access to req, and res and these functions will be called everytim e a request hits our server.

app.use(cors()); // Allows us to get data from a remote source such as TMDB
app.use(express.json()); // Allow us to accept JSON in the body of a request, so if we are sent a post request, we are saying here is JSON data that we are sending to your server, we want the server to convert this into a javascript object that can be saved and references throughout the application. 

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
// Use /api/v1/reviews as the base URL and import the 
// reviews router 
app.use("/api/v1/reviews", reviews);

// Allows us to serve static files via server
app.use(express.static('public'))


// Anything besides the base and /api/v1/reviews will load a 404 error
app.use("*", (req,res)=>{
    res.status(404).json( {errorMessage: '404 Not Found'} );
});


// Export the server( we are not running the main server via this file)
//module.exports = app; 
module.exports = app;