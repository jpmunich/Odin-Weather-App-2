import {
  createElement,
  createTextElement,
  createElementWithClass,
} from "./UIController.js";
const content = document.getElementById("content");

function createBackground() {
  document.getElementById("content").style.backgroundImage =
    "url(../dist/images/landscape.jpg)";
}

function createNav() {
  const navContainer = createElementWithClass("div", content, "nav-container");

  createTextElement("h1", navContainer, "Cloudy");
  createTextElement("h4", navContainer, "Seattle");
  createTextElement("p", navContainer, "Monday, 27th Nov 2023 8:27 pm");
  const temperatureText = createTextElement("h1", navContainer, "47 °F");
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
  search.placeholder = "Search";

  const searchBar = createElementWithClass(
    "img",
    searchContainer,
    "search-img"
  );
  searchBar.src = "../dist/images/search.svg";
}
createNav();
export { createBackground, createNav };
