/*Changing the  searched city and its temperature */
function displayCityTemperature(response) {
    let cityTemp = Math.round(response.data.main.temp);
    let tempToDisplay = document.querySelector("#temperature");
    tempToDisplay.innerHTML = cityTemp; //Display the searched city's temperature
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
      let arr = city.split(" ");
  
      //extract the first character in each word and convert them into uppercase
      for (let i in arr) {
        let firstChar = arr[i][0];
        firstChar = firstChar.toUpperCase();
        arr[i] = firstChar.concat(arr[i].slice(1));
      }
  
      let toPrint = arr.join(" "); //
      cityToChange.innerHTML = toPrint;
  
      //getting the searched city's temperature
      let apiKey = "863238029d9dfa4b08aae7c3cedb56d6";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${toPrint}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayCityTemperature);
    }
  }
  
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getInput);
  
  /*Current City and Temperature according to your location*/
  
function displayCurrentTemperature(response) {
    let currentTemp = Math.round(response.data.main.temp);
    let tempToDisplay = document.querySelector("#temperature");
    tempToDisplay.innerHTML = currentTemp; //Display the current temperature
    let cityToDisplay = document.querySelector("#city-to-change");
    cityToDisplay.innerHTML = response.data.name; //Display the current city
  }
function getCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
  
    let apiKey = "863238029d9dfa4b08aae7c3cedb56d6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrentTemperature);
  }
  
function getCurrentTemperature(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }
  
const currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentTemperature);
  
  /* Getting current date and time */
  
  const today = new Date();
  const options = { weekday: "long" };
  const dayNow = new Intl.DateTimeFormat("en-US", options).format(today);
  const timeNow = `${today.getHours()}:${today.getMinutes()}`;
  
let dateTime = document.querySelector("#datetime-to-change");
dateTime.innerHTML = `${dayNow} ${timeNow}`;
  
  /*
  // Converting the temperature units
  
  function toCelcius(event) {
    let defaultTemperature = 70;
    event.preventDefault();
    let temperatureFah = defaultTemperature;
    let converted = ((temperatureFah - 32) * 5) / 9;
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(converted); //update the value on html page
    defaultTemperature = Math.round(converted);
  
    //changing the color of the unit links
    convertToCelcius.classList.remove("text-dark");
    convertToCelcius.classList.add("text-primary");
    convertToFahrenheit.classList.remove("text-primary");
    convertToFahrenheit.classList.add("text-dark");
    return defaultTemperature; //return the updated temperature to use later again
  }
  
  function toFahrenheit(event) {
    let defaultTemperature = toCelcius(event);
    event.preventDefault();
    let temperatureCel = defaultTemperature;
    let converted = temperatureCel * 1.8 + 32;
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(converted); //update the value on html page
    defaultTemperature = Math.round(converted);
  
    //changing the color of the unit links
    convertToCelcius.classList.remove("text-primary");
    convertToCelcius.classList.add("text-dark");
    convertToFahrenheit.classList.remove("text-dark");
    convertToFahrenheit.classList.add("text-primary");
    return defaultTemperature; //return the updated temperature to use later again
  }
  
  let convertToCelcius = document.querySelector("#celcius");
  convertToCelcius.addEventListener("click", toCelcius);
  
  let convertToFahrenheit = document.querySelector("#fahrenheit");
  convertToFahrenheit.addEventListener("click", toFahrenheit);
  */
  