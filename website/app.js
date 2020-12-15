
/* Global Variables */
const base_URL = "http://api.openweathermap.org/data/2.5/weather?zip="
const API_Key = "&APPID=13b32b894b8e5b145f1cabd32950b89f&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

function performAction(e){
    
    const user_response = document.getElementById("feelings").value;
    const zip = document.getElementById("zip").value;
    if(zip.value)
    {
        alert("Please, enter a ZIP code");
        return ;
    }
    getData(base_URL,zip,API_Key)
    .then( function (data){
        postData("/add", {temperature : data.main.temp, date: newDate, userResponse: user_response});
    }).then(
        updateUI()
      )
}



const updateUI = async () => {
  const request = await fetch("/getdata");
  try{
    const Data = await request.json();
    document.getElementById('date').innerHTML = Data.date;
    document.getElementById('temp').innerHTML = Data.temperature;
    document.getElementById('content').innerHTML = Data.userResponse;
    
}catch(error){
    console.log("error", error);
}
}

/** Async Function to get data from weather API */
getData = async (base, zipCode, API) =>{
    
    const response = await fetch(base + zipCode + API);
    try{
        const data = await response.json();
        //console.log(data.main.temp);
        return data;
    }
    catch(error){
        console.log("error", error);
    }
}

/**Async Function to post data */
postData = async (url='', data={}) =>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
    try{
        console.log(response.body);
        const newData = await response.json();
        console.log("new data",newData);
        return newData;
    }
    catch(error){
        console.log(response.body);
        console.log("error", error);
    }
}

/**Event listeners */
document.getElementById("generate").addEventListener('click', performAction);