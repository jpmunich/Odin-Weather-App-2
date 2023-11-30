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
  createTextElement("h1", content, "Cloudy");
  createTextElement("h4", content, "Seattle");
  createTextElement("p", content, "Monday, 27th Nov 2023 8:27 pm");
  createTextElement("h1", content, "47 °F");
  createTextElement("p", content, "Display: °F");

  const weather = createElementWithClass("img", content, "weather-img");
  weather.src = "../dist/images/cloudy.svg";

  const searchContainer = createElementWithClass(
    "div",
    content,
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
