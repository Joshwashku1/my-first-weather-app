var getE = document.getElementById('search-b');
var getInput = document.getElementById('search-input');
var resultC = document.getElementById('current-day');

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
        console.log("Daily'''''''''''''")
        console.log(data);
    });
}

function handleSearchBtn(event){
    event.preventDefault();

    var userInput = getInput.value;

    if(userInput){
        searchCurrent(userInput);
        searchDaily(userInput);
    }

}

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



getE.addEventListener('click', handleSearchBtn);



