
//Parameters: Using constant because dont wany variables to change
const apiKey = '8b45b7add1d520d749b163daf2502448';
const lat = '30.07';
const lon = '-78.45';
const units = 'imperial';

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

//fetch forecast returns a response (JSON) object. We must then handle it with then() and catch() errors
fetchForecast()
.then( response => {
  console.log(response.list[0].main.temp);
  console.log(response.list[0].weather[0].description);
  console.log(response.list[0].dt_txt);
  const forecastData = response.list;
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




      
  
