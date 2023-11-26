import { createElement } from "./UIController";
const content = document.getElementById("content");
const key = "170fee3662f94ec3d6b36434fe3d4c00";
const lat = -47.6061;
const lon = 122.3328;

function createBackground() {
  document.getElementById("content").style.backgroundImage =
    "url(../dist/images/landscape.jpg)";
}

const input = createElement("input", content);
const button = createElement("button", content);
button.innerText = "Search";

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
  );
  const json = await response.json();
  console.log(json);
}

button.addEventListener("click", () => {
  requestData(input.value).catch((error) => {
    console.log("Error!");
    console.error(error);
  });
});

export { createBackground, requestData };
