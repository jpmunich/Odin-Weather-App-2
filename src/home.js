import {
  createElement,
  createTextElement,
  createElementWithClass,
  createWeatherCell,
  createForecastCell,
} from "./UIController.js";

let units = "imperial";

const content = document.getElementById("content");
const topContent = createElementWithClass("div", content, "top-content");

function createBackground() {
  content.style.backgroundImage = "url(../dist/images/landscape.jpg)";
}

function updateBackground(weather, time) {
  const weatherSVG = document.getElementsByClassName("weather-img")[0];
  const random = Math.floor(Math.random() * 2);
  console.log(random);
  if (weather === "Rain" || weather === "Drizzle") {
    content.style.backgroundImage = `url(../dist/images/rain.jpg)`;
    weatherSVG.src = "../dist/images/cloud-rain.svg";
  } else if (weather === "Clear") {
    content.style.backgroundImage = `url(../dist/images/landscape.jpg)`;
    weatherSVG.src = "../dist/images/sun.svg";
  } else if (weather === "Thunderstorm" && random === 0) {
    content.style.backgroundImage = `url(../dist/images/lightning-strike.jpg)`;
    weatherSVG.src = "../dist/images/cloud-lightning.svg";
  } else if (weather === "Thunderstorm" && random === 1) {
    content.style.backgroundImage = `url(../dist/images/lightning.jpg)`;
    weatherSVG.src = "../dist/images/cloud-lightning.svg";
  } else if (weather === "Mist" || weather === "Fog") {
    content.style.backgroundImage = `url(../dist/images/cloudy-forest.jpg)`;
    weatherSVG.src = "../dist/images/droplet.svg";
  } else if (weather === "Clouds") {
    content.style.backgroundImage = `url(../dist/images/cloudy-day.jpg)`;
    weatherSVG.src = "../dist/images/cloudy.svg";
  } else if (weather === "Smoke" || weather === "Haze") {
    content.style.backgroundImage = `url(../dist/images/cloudy-forest.jpg)`;
    weatherSVG.src = "../dist/images/alert-triangle.svg";
  } else if (weather === "Dust" || weather === "Sand") {
    content.style.backgroundImage = `url(../dist/images/desert.jpg)`;
    weatherSVG.src = "../dist/images/sun.svg";
  } else if (weather === "Snow" && random === 0) {
    content.style.backgroundImage = `url(../dist/images/snow.jpg)`;
    weatherSVG.src = "../dist/images/snowflake.svg";
  } else if (weather === "Snow" && random === 1) {
    content.style.backgroundImage = `url(../dist/images/snowy-forest.jpg)`;
    weatherSVG.src = "../dist/images/snowflake.svg";
  } else {
    content.style.backgroundImage = `url(../dist/images/landscape.jpg)`;
    weatherSVG.src = "../dist/images/sun.svg";
  }

  if (weather === "Clear" && (time >= 19 || time <= 8)) {
    content.style.backgroundImage = `url(../dist/images/night-time.jpg)`;
    weatherSVG.src = "../dist/images/moon.svg";
  }
}

function createNav(weatherDescription, city, date, temperature) {
  const navContainer = createElementWithClass(
    "div",
    topContent,
    "nav-container"
  );

  const weatherText = createTextElement("h1", navContainer, weatherDescription);
  weatherText.setAttribute("id", "weather-description-text");
  const cityText = createTextElement("h4", navContainer, city);
  cityText.setAttribute("id", "city-description-text");
  const dateText = createTextElement("p", navContainer, date);
  dateText.setAttribute("id", "date-description-text");

  const temperatureText = createTextElement(
    "h1",
    navContainer,
    `${temperature} °F`
  );

  temperatureText.classList.add("temperature-text");
  const toggleUnits = createTextElement("button", navContainer, "Display: °F");
  toggleUnits.setAttribute("id", "toggle-units");
  toggleUnits.addEventListener("click", () => {
    if (units === "imperial") {
      units = "metric";
      toggleUnits.innerText = `Display: °C`;
    } else if (units === "metric") {
      units = "imperial";
      toggleUnits.innerText = `Display: °F`;
    }
  });

  const weather = createElementWithClass("img", navContainer, "weather-img");
  weather.src = "../dist/images/cloudy.svg";

  const searchContainer = createElementWithClass(
    "div",
    navContainer,
    "search-container"
  );
  const search = createElement("input", searchContainer);
  search.setAttribute("id", "search-bar");
  search.placeholder = "Search";

  const searchBar = createElementWithClass(
    "img",
    searchContainer,
    "search-img"
  );
  searchBar.src = "../dist/images/search.svg";
}

function updateNavValues(weatherDescription, city, date, temperature) {
  const weatherText = document.getElementById("weather-description-text");
  const cityText = document.getElementById("city-description-text");
  const dateText = document.getElementById("date-description-text");
  const tempuratureText =
    document.getElementsByClassName("temperature-text")[0];

  weatherText.innerText = weatherDescription;
  cityText.innerText = city;
  dateText.innerText = date;
  if (units === "imperial") tempuratureText.innerText = `${temperature} °F`;
  else if (units === "metric") tempuratureText.innerText = `${temperature} °C`;
}

function createWeatherCellGrid(
  sunrise,
  sunset,
  pressure,
  windDirection,
  temp,
  humidity,
  visibility,
  wind
) {
  const cellContainer = createElementWithClass(
    "div",
    topContent,
    "cell-container"
  );

  const leftCellContainer = createElementWithClass(
    "div",
    cellContainer,
    "left-cell-container"
  );

  const rightCellcontainer = createElementWithClass(
    "div",
    cellContainer,
    "right-cell-container"
  );

  const sunriseCell = createWeatherCell(
    leftCellContainer,
    "../dist/images/sunrise.svg",
    "Sunrise",
    sunrise
  );
  sunriseCell.setAttribute("id", "sunrise-cell");

  const sunsetCell = createWeatherCell(
    leftCellContainer,
    "../dist/images/sunset.svg",
    "Sunset",
    sunset
  );
  sunsetCell.setAttribute("id", "sunset-cell");

  const pressureCell = createWeatherCell(
    leftCellContainer,
    "../dist/images/target.svg",
    "Pressure",
    pressure
  );
  pressureCell.setAttribute("id", "pressure-cell");

  const windDirectionCell = createWeatherCell(
    leftCellContainer,
    "../dist/images/wind.svg",
    "Wind Direction",
    windDirection
  );
  windDirectionCell.setAttribute("id", "wind-direction-cell");

  const feelsLikeCell = createWeatherCell(
    rightCellcontainer,
    "../dist/images/thermometer.svg",
    "Feels Like",
    `${temp} °F`
  );
  feelsLikeCell.setAttribute("id", "feels-like-cell");

  const humidityCell = createWeatherCell(
    rightCellcontainer,
    "../dist/images/droplet.svg",
    "Humidity",
    humidity
  );
  humidityCell.setAttribute("id", "humidity-cell");

  const visibilityCell = createWeatherCell(
    rightCellcontainer,
    "../dist/images/eye.svg",
    "Visibility",
    visibility
  );
  visibilityCell.setAttribute("id", "visibility-cell");

  const windCell = createWeatherCell(
    rightCellcontainer,
    "../dist/images/wind.svg",
    "Wind Speed",
    wind
  );
  windCell.setAttribute("id", "wind-cell");
}

function updateCellValues(
  sunrise,
  sunset,
  pressure,
  windDirection,
  temp,
  humidity,
  visibility,
  wind
) {
  const sunriseCell = document.getElementById("sunrise-cell");
  sunriseCell.innerText = `${sunrise}`;
  const sunsetCell = document.getElementById("sunset-cell");
  sunsetCell.innerText = `${sunset}`;
  const pressureCell = document.getElementById("pressure-cell");
  pressureCell.innerText = `${pressure}mb`;
  const windDirectionCell = document.getElementById("wind-direction-cell");
  windDirectionCell.innerText = `${windDirection}°`;
  const feelsLikeCell = document.getElementById("feels-like-cell");
  if (units === "imperial") feelsLikeCell.innerText = `${temp} °F`;
  else if (units === "metric") feelsLikeCell.innerText = `${temp} °C`;

  const humidityCell = document.getElementById("humidity-cell");
  humidityCell.innerText = `${humidity}%`;
  const visibilityCell = document.getElementById("visibility-cell");
  visibilityCell.innerText = `${visibility}m`;
  const windCell = document.getElementById("wind-cell");
  if (units === "imperial") windCell.innerText = `${wind}mph`;
  else if (units === "metric") windCell.innerText = `${wind} m/s`;
}

function createForecast(highs, lows) {
  const toggleContainer = createElementWithClass(
    "div",
    content,
    "toggle-container"
  );
  const toggleForecastDaily = createTextElement(
    "button",
    toggleContainer,
    "Daily Forecast"
  );
  toggleForecastDaily.setAttribute("id", "toggle-forecast-daily");

  const forecastContainer = createElementWithClass(
    "div",
    content,
    "forecast-container"
  );

  createForecastCell(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Sunday",
    highs[0],
    lows[0]
  );
  createForecastCell(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Monday",
    highs[1],
    lows[1]
  );
  createForecastCell(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Tuesday",
    highs[2],
    lows[2]
  );
  createForecastCell(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Wednesday",
    highs[3],
    lows[3]
  );
  createForecastCell(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Thursday",
    highs[4],
    lows[4]
  );
}

function updateForecastValues(highs, lows) {
  for (
    let i = 0;
    i < document.getElementsByClassName("temp-high").length;
    i++
  ) {
    if (units === "imperial") {
      document.getElementsByClassName("temp-high")[
        i
      ].innerText = `${highs[i]} °F`;
      document.getElementsByClassName("temp-low")[
        i
      ].innerText = `${lows[i]} °F`;
    } else if (units === "metric") {
      document.getElementsByClassName("temp-high")[
        i
      ].innerText = `${highs[i]} °C`;
      document.getElementsByClassName("temp-low")[
        i
      ].innerText = `${lows[i]} °C`;
    }
  }
}

function updateForecastDay(day) {
  for (
    let i = 0;
    i < document.getElementsByClassName("temp-high").length;
    i++
  ) {
    if (day[i] % 7 === 0)
      document.getElementsByClassName("forecast-day")[i].innerText = `Sunday`;
    else if (day[i] % 7 === 1)
      document.getElementsByClassName("forecast-day")[i].innerText = `Monday`;
    else if (day[i] % 7 === 2)
      document.getElementsByClassName("forecast-day")[i].innerText = `Tuesday`;
    else if (day[i] % 7 === 3)
      document.getElementsByClassName("forecast-day")[
        i
      ].innerText = `Wednesday`;
    else if (day[i] % 7 === 4)
      document.getElementsByClassName("forecast-day")[i].innerText = `Thursday`;
    else if (day[i] % 7 === 5)
      document.getElementsByClassName("forecast-day")[i].innerText = `Friday`;
    else if (day[i] % 7 === 6)
      document.getElementsByClassName("forecast-day")[i].innerText = `Saturday`;
  }
}

createNav("Cloudy", "Seattle", "Monday, 27th Nov 2023 8:27 pm", "47");
createWeatherCellGrid(
  "7:30",
  "8:00",
  "1040",
  "100°",
  17,
  "58%",
  "10000m",
  "14 mph"
);
createForecast([43, 44, 45, 46, 47, 42, 39], [39, 40, 42, 42, 42, 39, 34]);

export {
  createBackground,
  updateNavValues,
  updateCellValues,
  updateForecastValues,
  updateForecastDay,
  updateBackground,
};
