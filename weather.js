
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

        let imagePath = "images/default.png"; 
        switch (data.weather[0].main) {
            case "Clouds":
                imagePath = "images/clouds.png";
                break;
            case "Snow":
                imagePath = "images/snow.png";
                break;
            case "Mist":
                imagePath = "images/mist.png";
                break;
            case "Rain":
                imagePath = "images/rain.png";
                break;
            case "Drizzle":
                imagePath = "images/drizzle.png";
                break;
            case "Clear":
                imagePath = "images/clear.png";
                break;
            default:
                console.log("Weather condition not recognized.");
        }

        weatheric.src = imagePath;

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

