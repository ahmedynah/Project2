// Setup empty JS object to act as endpoint for all routes
projectData = {
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { json } = require('body-parser');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen( port, ()=> console.log(`Servers is on and listens on port: ${port}`));


/**GET Route handling**/

//Handel_GET implementation
/**
 * @param {*} req the request object received 
 * @param {*}res the response object to convey the data
 */

handle_GET =  (req, res) =>{
    res.send(projectData);
    //console.log(projectData);
}

app.get("/getData", handle_GET); // i tried to make the url the home page i.e("/") but the response is an html object which produce errors


/** POST Route handling */

//Handel_POST implementation
/**
 * @param {*}req the request object received 
 * @param {*} res the response object to convey the data
 */

handle_POST = (req, res) => {
    console.log("in server code:",req.body);
    projectData["temperature"] = req.body.temperature;
    projectData["date"] = req.body.date;
    projectData["userResponse"] = req.body.userResponse;
    console.log("in and data = ", projectData);
    res.send(projectData);
}

app.post("/add", handle_POST); //upon debugging, writing any path did not produced errors as long as the body object is written properly

