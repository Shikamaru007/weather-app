
const container = document.getElementById("container"); // Selects the main page container;
const editBtn = document.getElementById("edit"); // Selects the edit icon button;
const closeBtn = document.getElementById("close"); // Selects the cross icon button;
const locationBtn = document.getElementById("locationBtn"); // Selects the location button;
const title = document.getElementById("title"); // Selects the textblock for displaying city names;
const subTitle = document.querySelector(".locte");
const icon = document.querySelector(".currentIcon"); // Selects the main icon container;

// Assigns all weather codes from the API to their respective conditions;
const backgrounds = {
    day: {
        'sunny': [1000, ],
        'partly cloudy': [1003],
        'cloudy': [1006, 1009, 1153],
        'hazy': [1030],
        'snow': [1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1249, 1252, 1255, 1258, 1261, 1264, ],
        'thunderstorm': [1087, 1273, 1276, 1279, 1282],
        'foggy': [1135],
        'rainy': [1180, 1183, 1186, 1189, 1192, 1195, 1222, 1225, 1237, 1240, 1243, 1246, ],
        'windy': [1063, 1150],
        
    },
    night: {
        'clear night': [1000, 1003, 1006, 1150],
        'cloudy': [1009, 1063, 1153],
        'hazy': [1030],
        'snow': [1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1246, 1249, 1252, 1255, 1258, 1261, 1264, ],
        'thunderstorm': [1087, 1273, 1276, 1279, 1282],
        'foggy': [1135],
        'rainy': [1180, 1183, 1186, 1189, 1192, 1195, 1222, 1225, 1237, 1240, 1243, ],
    }
}

// Assigns all respective conditions to their respective images;
const backgroundsPaths = {    
        "sunny": './images/pictures/Sunny.png',
        'partly cloudy': './images/pictures/Partly Cloudy.png',
        "clear night": './images/pictures/Clear night.png',
        "cloudy": './images/pictures/Cloudy.png',
        "foggy": './images/pictures/Foggy.png',
        "hazy": './images/pictures/Hazy.png',
        "rainy": './images/pictures/Rainy.png',
        "snow": './images/pictures/Snow.png',
        "thunderstorm": './images/pictures/Thunderstorm.png',
        "windy": './images/pictures/Partly Windy.png'   
}

// Assigns all weather icon codes to their appropriate conditions;
const weatherConditions = {
    'clear day': [1000,],
    'clear night': [1000, 1006,],
    'cloudy': [1006, 1009, ],
    'extreme rainy': [ 1192, 1195, 1222, 1225, 1237, 1240, 1243, 1246, ],
    'haze': [1030],
    'mist': [1135],
    'overcast': [1135],
    'partly cloudy day rain': [1150, 1153, 1180, 1183, 1186,1189, 1063],
    'partly cloudy night rain': [1150, 1153, 1180, 1183, 1186, 1189],
    'partly cloudy day': [1003],
    'partly cloudy night': [1003],
    'snow': [1066, 1069, 1072, 1114, 1117, 1147, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1246, 1249, 1252, 1255, 1258, 1261, 1264, ],
    'thunderstorm extreme': [1087, 1273, 1276, 1279, 1282],

}

// This selects the icon to display based on the weather condition from the codes;
const weatherIcons = {
    day: {
        'clear day': ["images/weather-icons/clear-day.svg"],
        'cloudy': ["images/weather-icons/cloudy.svg"],
        'extreme rainy': ["images/weather-icons/extreme-rain.svg"],
        'haze': ["images/weather-icons/haze.svg"],
        'mist': ["images/weather-icons/mist.svg"],
        'overcast': ["images/weather-icons/overcast.svg"],
        'partly cloudy day rain': ["images/weather-icons/partly-cloudy-day-rain.svg"],
        'partly cloudy day': ["images/weather-icons/partly-cloudy-day.svg"],
        'snow': ["images/weather-icons/snow.svg"],
        'thunderstorm extreme': ["images/weather-icons/thunderstorms-extreme.svg"],
    },
    night: {
        'clear day': ["images/weather-icons/clear-night.svg"],
        'cloudy': ["images/weather-icons/cloudy.svg"],
        'extreme rainy': ["images/weather-icons/extreme-rain.svg"],
        'haze': ["images/weather-icons/haze.svg"],
        'mist': ["images/weather-icons/mist.svg"], 
        'overcast': ["images/weather-icons/overcast.svg"], 
        'partly cloudy night rain': ["images/weather-icons/partly-cloudy-night-rain.svg"], 
        'partly cloudy day': ["images/weather-icons/partly-cloudy-night.svg"], 
        'snow': ["images/weather-icons/snow.svg"],
        'thunderstorm extreme': ["images/weather-icons/thunderstorms-extreme.svg"],
    }
};

// Helper function that fetches the correct icon to be displayed on the webpage;
function getWeatherIcon (condition, isDay) {
    const timeOfDay = isDay ? "day" : "night";        

    for(const [key, codes] of Object.entries(weatherConditions)){
        if(codes.includes(condition)){           
            return weatherIcons[timeOfDay][key];
        }
    }
}

// Helper function that fetches the correct background to be displayed on the webpage;
function getImageBackground(condition, isDay){
    const timeOfDay = isDay ? "day" : "night";

    for(const [key, codes] of Object.entries(backgrounds[timeOfDay])){
        if(codes.includes(condition)){            
            return backgroundsPaths[key];
        }
    }
}


// Function to execute when the edit button is clicked;
editBtn.onclick = function showEditPanel(){
    const input = document.getElementById("input");
    input.value = "";
    container.classList.remove("show");
};

// Function to execute when the search button is clicked;
function showCitySearched() {
    const input = document.getElementById("input");
    const city = input.value;
    
    if(city === ""){
        container.classList.remove("show");
        window.alert("You need to enter a city name");
    }else{
        fetchSearchWeather(city.trim());
    };
};

// Function to execute the search function when "Enter " is pressed;
document.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        showCitySearched();
    }
})

// Function to execute when the close icon button is clicked;
closeBtn.onclick = function closeEditPanel() {
    const input = document.getElementById("input");
    const title = document.getElementById("title");

    if(title.textContent === ""){
        window.alert("Please type in a city name or click the location icon")
        return
    }else{
        input.value = "";
        container.classList.add("show");
    }
}


// Function to execute when the location icon button is clicked;
locationBtn.onclick = function getUserCurrentLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            fetchLocationWeather(latitude, longitude);
        },
    () => { window.alert("location cannot be fetched, Please try again.") })
    }else{
        window.alert("Location cannot be fetched")
    }
}


// Async function that fetches the data based on search input.
async function fetchSearchWeather(city){
    try{
        const API = ' https://api.weatherapi.com/v1/forecast.json';
        const API_KEY = 'a4458b4886a944eeaec204004241911';

        const response = await axios.get(API, {
                                    params: {
                                        q: `${city}`,
                                        key: API_KEY,
                                        days: "4",
                                    }
        });

        const weather = response.data;
        updateUI(weather);
        
    }catch(error){
        window.alert("Please enter a valid city name")
    }
}

// Async function that fetches the data based on longitude and latitude input.
async function fetchLocationWeather(latitude, longitude) {
    try{
        const API = ' https://api.weatherapi.com/v1/forecast.json';
        const API_KEY = 'a4458b4886a944eeaec204004241911';

        const response = await axios.get(API, {
                                    params: {
                                        q: `${latitude},${longitude}`,
                                        key: API_KEY,
                                        days: "4",
                                    }
        });

        const weather = response.data;
        updateUI(weather);
        
    }catch(error){
        window.alert(error)
    } 
}

// FUnction that updates the webpage based on the data recieved.
function updateUI(data){
    
    const image = document.getElementById("image");
    const currentIcon = document.createElement("img");
    const temperature = document.getElementById("feelsLike");
    const feelsLike = document.getElementById("temperature");
    const wind = document.getElementById("wind");
    const humidity = document.getElementById("humidity");
    const forecastContainer = document.getElementById("forecastContainer");

    forecastContainer.innerHTML = ""
    icon.innerHTML = ""
    
        
    const weatherText = document.querySelector(".weather-text");
    const date = document.querySelector(".current-date");
    const weatherCondition = data.current.condition.code; // gets weather condition.
    const isDay = data.current.is_day; // gets day condition, if day or night.
    const extractedDate = data.forecast.forecastday[0].date
    const formattedDate = new Date(extractedDate);
    const dateOptions = {weekday: "long", day: "2-digit", month: "short", year: "numeric"};
    const dateOutput = formattedDate.toLocaleDateString("en-US", dateOptions);
    const otherDays = data.forecast.forecastday;
    const forecast = otherDays.slice(1, 4);

    forecast.forEach(day => {        
        const forcastDate = new Date(day.date);
        const forcastIcon = getWeatherIcon(day.day.condition.code, 1);
        const lineDay = forcastDate.toLocaleDateString("en-US", {weekday: "long"})
        const line = document.createElement("div");

        line.classList.add("forecast");
        line.innerHTML = ` <div class="forcast-day">${lineDay}</div>
                <div class="forcast-data">
                    <div class="forcast-icon"><img src="${forcastIcon}" alt="weather icon"></div>
                   <div><p>${day.day.maxtemp_c}</p><span class="degree"> °c</span></div>
                </div>`;

        forecastContainer.appendChild(line);
    }) 

    title.textContent = `${data.location.name}, `;
    subTitle.textContent = data.location.region;
    image.src = getImageBackground(weatherCondition, isDay);
    temperature.textContent = Math.round(data.current.feelslike_c);
    weatherText.textContent = data.current.condition.text;
    date.textContent = dateOutput;
    feelsLike.textContent = data.current.feelslike_c;
    wind.textContent = `${data.current.wind_kph} kph`;
    humidity.textContent = `${data.current.humidity}%`;
    currentIcon.src = getWeatherIcon(weatherCondition, isDay);

    icon.appendChild(currentIcon)

    container.classList.add("show");
}
