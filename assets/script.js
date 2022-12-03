var getE = document.getElementById('search-b');
var getInput = document.getElementById('search-input');
var resultC = document.getElementById('current-day');

var APIKey = "e061528d54d5657e594e68a2750d11be";



 function searchAPI(city){

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +
 "&appid=" + APIKey +"&units=imperial";

    fetch(queryURL)
    .then(function (response) {
        console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        displayCurrent(data);
    //   for (var i = 0; i < data.length; i++) {
    //     var listItem = document.createElement('li');
    //     listItem.textContent = data[i].city.name;
    //     console.log("This is: " + listItem);
    //     dataE.appendChild(listItem);
    //   }
    });
}

function handleSearchBtn(event){
    event.preventDefault();

    var userInput = getInput.value;

    if(userInput){
        searchAPI(userInput);
    }

}

function displayCurrent(data){
    var cityName = data.city.name;
    var temp = Math.floor(data.list[0].main.temp) + "F";
    var wind = data.list[0].wind.speed + " MPH";
    var humidity = data.list[0].main.humidity + "%";

    document.getElementById('current-city').textContent = cityName;
    document.getElementById('current-1').textContent = "Temp: " + temp;
    document.getElementById('current-2').textContent = "Wind: " + wind;
    document.getElementById('current-3').textContent = "Humidity: " + humidity;
    

}



console.log(kelvinToFar(288));
getE.addEventListener('click', handleSearchBtn);



