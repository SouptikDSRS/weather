alert('Welcome to weather')

const apikey = "299d54e6920207379b675512951f32fd";
const apurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search1 = document.querySelector(".search input");
const sbutt = document.querySelector(".search button");
const weatheric = document.querySelector(".weather-log");

async function checkweather(place) {
    const response = await fetch(apurl + place + `&appid=${apikey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".w1").style.display = "none";

    } else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".place").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main === "Clouds") {
            weatheric.src = "images/clouds.png";
        } else if (data.weather[0].main === "Snow") {
            weatheric.src = "images/snow.png";
        } else if (data.weather[0].main === "Mist") {
            weatheric.src = "images/mist.png";
        } else if (data.weather[0].main === "Rain") {
            weatheric.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatheric.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Clear") {
            weatheric.src = "images/clear.png";
        }

        document.querySelector(".w1").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

sbutt.addEventListener("click", () => {
    checkweather(search1.value);
});

search1.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const place = search1.value.trim();
        if (place) {
            checkweather(place);
        } else {
            alert("Please enter a city name.");
        }
    }
});

