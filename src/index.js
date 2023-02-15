function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let options = { weekday: "long" };
  let day = new Intl.DateTimeFormat("en-US", options).format(date);
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

/*Changing the  searched city and its temperature */
function displayCityTemperature(response) {
  //Displaying the searched city
  let cityToChange = document.querySelector("#city-to-change");
  cityToChange.innerHTML = response.data.name;
  
  //Display the searched city's temperature
  let cityTemp = Math.round(response.data.main.temp);
  let tempToDisplay = document.querySelector("#temperature");
  tempToDisplay.innerHTML = cityTemp;

  //Display the searched city's date and time
  let dateAndTime = document.querySelector("#datetime-to-change");
  dateAndTime.innerHTML = formatDate(response.data.dt * 1000);

  //Display the searched city's weather description
  let descriptionToDisplay = document.querySelector("#description");
  descriptionToDisplay.innerHTML = response.data.weather[0].description;

  //Display the searched city's weather icon
  let iconToDisplay = document.querySelector("#weather-icon");
  iconToDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconToDisplay.setAttribute("alt", response.data.weather[0].description);

  //Display the searched city's weather precipitation, humidity, wind speed
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function getInput(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let city = input.value;
  city = city.toLowerCase().trim();
  if (/[a-z]/gi.test(city) === false) {
    alert("Please type in a city");
  } else {
    let cityToChange = document.querySelector("#city-to-change");

    cityToChange.innerHTML = city;

    //getting the searched city's temperature
    search(city);
  }
}

function search(city){
  let apiKey = "863238029d9dfa4b08aae7c3cedb56d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityTemperature);
}

//Default 
search("New York");
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getInput);