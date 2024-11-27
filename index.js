const searchBtn = document.getElementById("searchBtn");
const container = document.getElementById("container");
const editBtn = document.getElementById("edit");
const closeBtn = document.getElementById("close");
const locationBtn = document.getElementById("locationBtn");

editBtn.onclick = function showEditPanel(){
    const input = document.getElementById("input");
    input.value = "";
    container.classList.remove("show");
};

searchBtn.onclick = function showCitySearched() {
    const input = document.getElementById("input");
    const city = input.value;
    
    if(city === ""){
        container.classList.remove("show");
        window.alert("You need to enter a city name");
    }else{
        fetchSearchWeather(city.trim());
    };
};

closeBtn.onclick = function closeEditPanel() {
    const input = document.getElementById("input");
    const title = document.getElementById("title");

    if(title.textContent === ""){
        return
    }else{
        input.value = "";
        container.classList.add("show");
    }
    
}

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

async function fetchSearchWeather(city){
    try{
        const API = ' http://api.weatherapi.com/v1/forecast.json';
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
        window.alert(error)
    }
}


async function fetchLocationWeather(latitude, longitude) {
    try{
        const API = ' http://api.weatherapi.com/v1/forecast.json';
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



function updateUI(data){
    container.classList.add("show");
}