const apikey="0a948dea828eb6d2e58252f81cd89d68";

const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search")
const weathericon = document.querySelector(".weather-icon img"); 
const cityNameElement = document.querySelector(".city-name");
const tempElement = document.querySelector(".temp"); 
const humidityElement = document.querySelector("#humidity");
const windSpeedElement = document.querySelector("#wind-speed");
const weatherInfo = document.querySelector(".weather-info");
const errorElement = document.querySelector(".error");
const detailsContainer = document.querySelector(".details"); 
const video = document.querySelector('video'); 

if (video) {
  video.playbackRate = 0.4; 
}

// Function to fetch weather data based on city name
// and update the UI

async function getWeatherData(city){
    const response=await fetch( apiurl + city +`&appid=${apikey}`);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather-info").style.display="block";
        document.querySelector(".error").innerHTML="City not found";
        cityNameElement.innerHTML="";
        tempElement.innerHTML="";
        humidityElement.innerHTML="";
        windSpeedElement.innerHTML="";
        weathericon.src="images/unknown.jpg";
        weathericon.alt="unknown";
        return;         
    }
    else{

    
    const data=await response.json();
    cityNameElement.innerHTML=data.name;
    console.log(data.name)
    tempElement.innerHTML=Math.round(data.main.temp)+"°C";
    humidityElement.innerHTML=data.main.humidity+ "%";
    windSpeedElement.innerHTML=data.wind.speed+"km/hr";
    detailsContainer.style.display = "flex";

    // Set the background image based on weather conditions

    if(data.weather[0].main==="Clouds"){
        weathericon.src="cloud.png";
    }
    else if(data.weather[0].main==="Clear"){
        weathericon.src="clear.png";
    } 
    else if(data.weather[0].main==="Sun"){           
        weathericon.src="sun.png";
    } 
    else if (data.weather[0].main==="Rain"){
        weathericon.src="rain.png";
    } 
    else if (data.weather[0].main==="Mist"){
        weathericon.src="mist.png";
    }
    else if (data.weather[0].main==="Snow"){
        weathericon.src="snow.png";
    } 
    else if (data.weather[0].main==="Thunderstorm"){
        weathericon.src="thunderstorm.png";
    }
    else if (data.weather[0].main==="Drizzle"){
        weathericon.src="drizzle.png";
    }  
    else if (data.weather[0].main==="Smoke"){
        weathericon.src="smoke.png";
    }    
    else if (data.weather[0].main==="Fog"){
        weathericon.src="fog.png";
    }  
    else if (data.weather[0].main==="Ash"){
        weathericon.src="ash.png";
    }  
    else if (data.weather[0].main==="Tornado"){
        weathericon.src="tornado.png";
    }
    
    weathericon.src=imagePath.src;
    weathericon.alt=data.weather-icon[0].main;

    weatherInfo.style.display = "block";
    errorElement.style.display = "none";
    }
}



// Function to get the user's location and fetch weather data
// based on that location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        getWeatherData("Chandrapur"); // Default to Chandrapur if no geolocation
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeatherByCoordinates(latitude, longitude);
}
function handleLocationError() {
    console.log("Unable to retrieve your location.");
    getWeatherData("Chandrapur"); // Default to Chandrapur if location retrieval fails
}

function getWeatherByCoordinates(latitude, longitude) {
   
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            cityNameElement.innerHTML = data.name;
            tempElement.innerHTML = Math.round(data.main.temp - 273.15) + "°C";
            humidityElement.innerHTML = data.main.humidity + "%";
            windSpeedElement.innerHTML = data.wind.speed + "km/hr";
            weatherInfo.style.display = "block";
            errorElement.style.display = "none";
        })
        .catch(error => {
            console.error("Error fetching weather by coordinates:", error);
        });
}

// Event listener for the search button
searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim();
    if (city) {
        getWeatherData(city);
        searchbox.value = ""; // Clear the input field after search
    }
});

// Call getLocation to fetch weather data based on user's location
getLocation();
