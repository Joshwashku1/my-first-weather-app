var getE = document.getElementById('search-b');
var getInput = document.getElementById('search-input');
var resultC = document.getElementById('current-day');
var forecastC = document.getElementById('forecast-container');
var savedContainer = document.getElementById('saved-container');

var APIKey = "e061528d54d5657e594e68a2750d11be";

var savedCities = [];

// This function is to fetch an api of the current weather
 function searchCurrent(city){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
 "&appid=" + APIKey +"&units=imperial";

    fetch(queryURL)
    .then(function (response) {
        console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        displayCurrent(data);
    });
}

// This function is to fetch the API of multiple weather data
function searchDaily(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+APIKey;
    fetch(queryURL)
    .then(function(response){ 
        console.log("Daily''''''''''''''")
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data.list[0].main.temp);
        console.log("Daily'''''''''''''")
        console.log(data);
        displayForecast(data);
    });
}

// handle the search value with the search button
function handleSearchBtn(event){
    event.preventDefault();

    var userInput = getInput.value;

    savedCities.push(userInput);
    localStorage.setItem('city', JSON.stringify(savedCities));

    // search if user put in input
    if(userInput){
        searchCurrent(userInput);
        searchDaily(userInput);

        forecastC.empty();

        
    }

}

// Displaying the current weather
function displayCurrent(data){
    var cityName = data.name;
    var temp = Math.floor(data.main.temp) + "F";
    var wind = data.wind.speed + " MPH";
    var humidity = data.main.humidity + "%";
    var iconCode = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    document.getElementById('wicon').setAttribute('src', iconUrl);
    document.getElementById('current-city').textContent = cityName;
    document.getElementById('current-1').textContent = "Temp: " + temp;
    document.getElementById('current-2').textContent = "Wind: " + wind;
    document.getElementById('current-3').textContent = "Humidity: " + humidity;
    

}

// Displaying the 5 day forecast
function displayForecast(data){
    document.getElementById('daily-city').textContent = data.city.name;
    for(i=0; i <= data.list.length; i++){
        // Loop over the three hour forecast to daily 
        i = i + 7;
        // const dayNum = i + 1;

        var dayForecast = document.createElement('div');

        var dayNumber = document.createElement('h3');
        dayNumber.textContent = data.list[i].dt_txt;
        dayForecast.appendChild(dayNumber);

        // create an icon for the weather
        var iconImg = document.createElement('img');
        var iconCode = data.list[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        iconImg.setAttribute('src', iconUrl);
        dayForecast.appendChild(iconImg);
        
        // create an element for the grabbed temp in the API call
        var temp = document.createElement('p');
        temp.textContent = "Temp: " + Math.floor(data.list[i].main.temp) + "F";
        dayForecast.appendChild(temp);

        // create an element for the wind speed in the API call
        var wind = document.createElement('p');
        wind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        dayForecast.appendChild(wind);

        // create an element for the grabbed humidity in the API call
        var humidity = document.createElement('p');
        humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        dayForecast.appendChild(humidity);

        // append the div in the forecast container
        forecastC.appendChild(dayForecast);

        
    };
}

// This function is being called below and will run when the page loads.
function init() {
    // Get stored City from localStorage
    var storedCity = JSON.parse(localStorage.getItem("city"));
  
    // If City were retrieved from localStorage, update the City array to it
    if (storedCity !== null) {
      savedCities = storedCity;
    }
  
    // This is a helper function that will render City to the DOM
    renderCities();
}

// The following function renders items in a saved list as <button> elements
function renderCities() {

    savedContainer.innerHTML = "";
  
    // Render a new button for each saved city
    for (var i = 0; i < savedCities.length; i++) {
      var savedCity = savedCities[i];
  
      var cityButton = document.createElement("button");
      cityButton.textContent = savedCity; 
      cityButton.classList = 'btn'
  
      
      savedContainer.appendChild(cityButton);
    }
  }

function handleSavedBtns(event){
    var target = event.target;

    if(target.matches('button') === true){
        searchCurrent(target.innerHTML);
        searchDaily(target.innerHTML);

        forecastC.textContent = '';
    }
}

getE.addEventListener('click', handleSearchBtn);
savedContainer.addEventListener('click', handleSavedBtns)
init();



