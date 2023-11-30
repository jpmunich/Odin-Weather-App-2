import {
  createElement,
  createTextElement,
  createElementWithClass,
  createWeatherCell,
  createForecastCell,
} from "./UIController.js";

const content = document.getElementById("content");
const topContent = createElementWithClass("div", content, "top-content");

function createBackground() {
  content.style.backgroundImage = "url(../dist/images/landscape.jpg)";
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
  createTextElement("p", navContainer, "Display: °F");

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
  tempuratureText.innerText = `${temperature} °F`;
}
function createWeatherCellGrid() {
  const cellContainer = createElementWithClass(
    "div",
    topContent,
    "cell-container"
  );

  createWeatherCell(
    cellContainer,
    "../dist/images/thermometer.svg",
    "Feels Like",
    "17 °F"
  );
  createWeatherCell(
    cellContainer,
    "../dist/images/droplet.svg",
    "Humidity",
    "69%"
  );
  createWeatherCell(
    cellContainer,
    "../dist/images/cloud-rain.svg",
    "Chance of Rain",
    "69%"
  );
  createWeatherCell(
    cellContainer,
    "../dist/images/wind.svg",
    "Wind Speed",
    "14.5 mph"
  );
}

function createForecast() {
  const toggleContainer = createElementWithClass(
    "div",
    content,
    "toggle-container"
  );
  const toggleForecastDaily = createTextElement(
    "button",
    toggleContainer,
    "Daily"
  );
  const toggleForecastHourly = createTextElement(
    "button",
    toggleContainer,
    "hourly"
  );
  const forecastContainer = createElementWithClass(
    "div",
    content,
    "forecast-container"
  );
  createForecastCell(forecastContainer);
  createForecastCell(forecastContainer);
  createForecastCell(forecastContainer);
  createForecastCell(forecastContainer);
  createForecastCell(forecastContainer);
  createForecastCell(forecastContainer);
  createForecastCell(forecastContainer);
}

createNav("Cloudy", "Seattle", "Monday, 27th Nov 2023 8:27 pm", "47");
createWeatherCellGrid();
createForecast();

export { createBackground, updateNavValues };
