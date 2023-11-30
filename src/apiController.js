import { updateCellValues, updateNavValues } from "./home";

const key = "170fee3662f94ec3d6b36434fe3d4c00";

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
  );
  const json = await response.json();
  const { visibility, rain, main, weather, name, wind } = json;

  console.log(main);
  console.log(rain);
  console.log(json);
  updateNavValues(
    weather[0].description,
    name,
    "Monday, 27th Nov 2023 8:27 pm",
    main.temp
  );
  updateCellValues(main.feels_like, main.humidity, visibility, wind.speed);
}

async function requestForecast(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=imperial`
  );
  const json = await response.json();
  const {
    city: { sunset },
  } = json;
  console.log(sunset);
  const sunsetTime = sunset * 1000;
  console.log(sunsetTime);
  const date = new Date(sunsetTime).toUTCString();
  console.log(date);
  console.log(json);
}

document.getElementById("search-bar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    requestData(document.getElementById("search-bar").value);
  }
});
export { requestData, requestForecast };
