//Parameters
// Using constant because dont wany variables to change
const apiKey = '8b45b7add1d520d749b163daf2502448';
const units = 'imperial';
//Using let because these valuse can change
let coordinateForm = document.getElementById("coordForm");
let lat = '';
let lon = '';

//Event listener for Coordinate Form
coordinateForm.addEventListener("submit", (e)=>{

  //prevents default behavior
  e.preventDefault();

  //gets data from form and put it in an object. Beneficial for larger forms
  const formData = new FormData(coordinateForm);

  lat = formData.get('latitude');
  lon = formData.get('longitude');


  //fetch forecast returns a response (JSON) object. We must then handle it with then() and catch() errors
  fetchForecast()
  .then( response => {
    let forecastData = response.list;
    dataUICompnent(forecastData);

  })
  .catch(error => {

    console.log("An error has occured.");

    let html = '';
    let htmlSegment = `<div id="errorContainer">
                          <h2>Error</h2>
                          <p>We apologize for the inconvenience, we are currently unable to load the data. Please try again later.</p>
                        </div>`;

    html += htmlSegment;

    let container = document.querySelector('#forecastContainer');
    container.innerHTML = html;

  })


})


//async function to fetch forecast. Async allows the function to return a promise
async function fetchForecast(){
  
  //await is used to wait for a promise. Can only be used inside async func.
  const result = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`, 
  {
    method: 'GET',
  });

  //Handling status code
  if(result.status === 200){
    //Extract the JSON Object from response
    //since its a promise we have to wait for JSON
    const data = await result.json();
    return data;
  } else {
    console.log(response.status)
  }

}


async function dataUICompnent(weekData){
  let html = '';
  for (const element of weekData) {
    let mainTemp = element.main.temp;
    let weatherDescription = element.weather[0].description;
    let dateAndTime = element.dt_txt;
    let index = dateAndTime.indexOf(" ");
    let date = new Date(dateAndTime).toDateString();
    let time = new Date(dateAndTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 

    let htmlSegment = ` <div class="dataContainer">
                        <h4> ${date}<h4>
                        <p>Time: ${time} </p>
                        <p>Description: ${weatherDescription} </p>
                        <p>Temperature: ${mainTemp} F </p>
                        </div>
    `
    html += htmlSegment;

    let container = document.querySelector('#forecastContainer');
    container.innerHTML = html;

  }

}




      
  
