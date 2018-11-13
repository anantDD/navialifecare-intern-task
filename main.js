let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let forecastBox = document.getElementById("forecastBox");
let Description = document.getElementById("Description");

getWeatherDetails();

getForecast();
setTimeout(displayAssumptions, 3000);
function displayAssumptions(){ 
  alert('I have made a few assumptions: \n    1. You wanted the forecast details in the box on the left-hand side, since it was not being used anywhere else \n    2. You wanted the weather details of Zangreb - Centar itself, not for the current location. \n    3. You do not require all the weather details like pressure etc, just the more pertinent ones. \n    4. This is not to be viewed on mobile, since we are using very large fixed widths.')
}
  

function getWeatherDetails() {
    let searchLink = 'https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&amp;id=1261481&amp;units=metric'
   httpRequestAsync(searchLink, currentWeatherResponse);
  }
function getForecast(){
  let searchLink = 'https://openweathermap.org/data/2.5/forecast/?appid=b6907d289e10d714a6e88b30761fae22&amp;id=1261481&amp;units=metric'
   httpRequestAsync(searchLink, forecastResponse);
}

function currentWeatherResponse(response) {
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = 'LOCATION: '+ jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = 'TEMPERATURE: '+parseInt(jsonObject.main.temp) + "°";
  humidity.innerHTML = 'HUMIDITY: '+jsonObject.main.humidity + "%";
  description.innerHTML = 'DESCRIPTION: '+jsonObject.weather[0].description;

}
function forecastResponse(response){
  let jsonObject = JSON.parse(response);
  forecastBox.innerHTML = 'FORECAST response </br></br>'+ JSON.stringify(jsonObject);
}

function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}