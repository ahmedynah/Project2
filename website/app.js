
/* Global Variables */
const base_URL = "http://api.openweathermap.org/data/2.5/weather?q="
const API_Key = "&APPID=13b32b894b8e5b145f1cabd32950b89f";
const user_response = document.getElementById("feelings").innerHTML;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function performAction(e){
    
    const zip = document.getElementById("zip");
    getData(base_URL,zip.value,API_Key)
    .then( function (data){
        postData("/add", {temperature : data, date: newDate, userResponse: user_response});
    }).then(
        updateUI()
      )
}



const updateUI = async () => {
  const request = await fetch('/');
  try{
    const Data = await request.json();
    document.getElementById('date').innerHTML = Data.tamp;
    document.getElementById('temp').innerHTML = Data.temperature;
    document.getElementById('content').innerHTML = Data.userResponse;

  }catch(error){
    console.log("error", error);
  }


/** Async Function to get data from weather API */
 getData = async (base, zipCode, API) =>{
    
    const response = await fetch(base + zipCode + API);
    try{
        const data = await response.json();
        //console.log(data.main.temp);
        return data.main.temp;
    }
    catch(error){
        console.log("error", error);
    }
}
 
/**Async Function to post data */
postData = async (url="", data ={}) =>{
    console.log(data);
    const response = await fetch(url,{
        method : 'POST',
        credentials:'same-origin',
        headers:{
            'content-type' : "application/json",
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log("new data",newData);
        return newData;
    }
    catch(error){
        console.log("error", error);
    }
}

/**Event listeners */
    document.getElementById("generate").addEventListener('click', performAction);