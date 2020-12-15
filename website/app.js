
/* Global Variables */
const base_URL = "http://api.openweathermap.org/data/2.5/weather?zip="
const API_Key = "&APPID=13b32b894b8e5b145f1cabd32950b89f&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear(); //adding 1 to the months as they are returned with zero reference


/**
 * Event Handler to do the following:
 * 1- get data from the API through getData()
 * 2- post data to local server
 * 3- update the UI with the new data received from the server through a get request
 * @param {*} e receives the event from the event listener 
 */
function performAction(e){
    
    const user_response = document.getElementById("feelings").value;
    const zip = document.getElementById("zip").value;
    

    if(zip == "") // to check that user isn't leaving the zip code field empty
    {
        alert("Please, enter a ZIP code!");
        return 0;
    }

    getData(base_URL,zip,API_Key)
    .then( function (data){
       
        postData("/add", {temperature : data.main.temp, date: newDate, userResponse: user_response});})
    
        .then(function (){

        updateUI();
    });
}


/**
 * Async function to update UI dynamically after getting data from server
 */
const updateUI = async () => {
  const request = await fetch("/getData");
  try{
    const Data = await request.json();
    document.getElementById('date').innerHTML = Data.date;  //current day
    document.getElementById('temp').innerHTML = Data.temperature;    //current temperature for the corresponding location of the zip-code
    document.getElementById('content').innerHTML = Data.userResponse;
    
}catch(error){
    console.log("error", error);
}
}

/** 
 *Async Function to get data from weather API
 */
getData = async (base, zipCode, API) =>{
    
    const response = await fetch(base + zipCode + API);
    try{
        const data = await response.json();
        //console.log(data.main.temp); //for debugging
        return data;
    }
    catch(error){
        console.log("error", error);
    }
}

/**
 * Async Function to post data
 */
/**
 * @param {*}  
 */
postData = async (url='', data={}) =>{
    //console.log(data);  //for debugging
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
    try{
        //console.log(response.body); //for debugging
        const newData = await response.json();
        //console.log("new data",newData); //for debugging
        return newData;
    }
    catch(error){
        //console.log(response.body); //for debugging
        console.log("error", error);
    }
}

/**
 * Event listeners upon click  event for the Generate button 
 */
document.getElementById("generate").addEventListener('click', performAction);