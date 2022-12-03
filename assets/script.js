var getE = document.getElementById('search-b');
var getInput = document.getElementById('search-input');

var APIKey = "e061528d54d5657e594e68a2750d11be";



 function searchAPI(city){

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +
 "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        console.log(response);
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        var listItem = document.createElement('li');
        listItem.textContent = data.city.name;
        body.appendChild(listItem);
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

function kelvinToFar(kelvin){
    var fahrenheit = kelvin-273;
    fahrenheit = fahrenheit*1.8;
    fahrenheit = fahrenheit + 32;
    return fahrenheit;
}

console.log(kelvinToFar(288));
getE.addEventListener('click', handleSearchBtn);



