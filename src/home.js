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
  document.getElementById("content").style.backgroundImage =
    "url(../dist/images/landscape.jpg)";
}

function createNav(weatherDescription, city, date, temperature) {
  const navContainer = createElementWithClass(
    "div",
    topContent,
    "nav-container"
  );

  createTextElement("h1", navContainer, weatherDescription);
  createTextElement("h4", navContainer, city);
  createTextElement("p", navContainer, date);
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

function createWeatherCellGrid() {
  const cellContainer = createElementWithClass(
    "div",
    topContent,
    "cell-container"
  );

  createWeatherCell(cellContainer);
  createWeatherCell(cellContainer);
  createWeatherCell(cellContainer);
  createWeatherCell(cellContainer);
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

export { createBackground, createNav };
