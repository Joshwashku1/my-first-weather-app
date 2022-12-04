var getE = document.getElementById('search-b');
var getInput = document.getElementById('search-input');
var resultC = document.getElementById('current-day');
var forecastC = document.getElementById('forecast-container');

var APIKey = "e061528d54d5657e594e68a2750d11be";


// This function is to call an api of the current weather
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
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&cnt=5&appid="+APIKey;
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

    if(userInput){
        searchCurrent(userInput);
        searchDaily(userInput);
    }

}

// Displaying the current weather
function displayCurrent(data){
    var cityName = data.name;
    var temp = Math.floor(data.main.temp) + "F";
    var wind = data.wind.speed + " MPH";
    var humidity = data.main.humidity + "%";

    document.getElementById('current-city').textContent = cityName;
    document.getElementById('current-1').textContent = "Temp: " + temp;
    document.getElementById('current-2').textContent = "Wind: " + wind;
    document.getElementById('current-3').textContent = "Humidity: " + humidity;
    

}

// Displaying the 5 day forecast
function displayForecast(data){

    for(i=0; i <= data.list.length; i++){
        const dayNum = i + 1;

        var dayForecast = document.createElement('div');

        var dayNumber = document.createElement('h3');
        dayNumber.textContent = "Day"+ dayNum;
        dayForecast.appendChild(dayNumber);

        var temp = document.createElement('p');
        temp.textContent = Math.floor(data.list[i].main.temp) + "F";
        dayForecast.appendChild(temp);

        var wind = document.createElement('p');
        wind.textContent = data.list[i].wind.speed + " MPH";
        dayForecast.appendChild(wind);

        var humidity = document.createElement('p');
        humidity.textContent = data.list[i].main.humidity + "%";
        dayForecast.appendChild(humidity);

        forecastC.appendChild(dayForecast);
    };
}

getE.addEventListener('click', handleSearchBtn);



