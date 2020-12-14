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
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen( port, ()=> console.log("Servers is on"));


/**GET Route handling**/

//Handel_GET implementation
/**
 * @param req the request object received 
 * @param res the response object to convey the data
 */

 handle_GET = (req, res) =>{
    res.send(projectData);
    console.log(projectData);
 }

app.get("/", handle_GET);




/** POST Route handling */

//Handel_GET implementation
/**
 * @param req the request object received 
 * @param res the response object to convey the data
 */
handle_POST = (req, res)=>{
    projectData["temperature"] = req.body[0];
    projectData["date"] = req.body[1];
    projectData["userResponse"] = req.body[2];
    res.send(projectData);
}

app.post("/add", handle_POST);