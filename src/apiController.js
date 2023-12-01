import {
  updateCellValues,
  updateForecastValues,
  updateNavValues,
} from "./home";

const key = "170fee3662f94ec3d6b36434fe3d4c00";

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
  );
  const json = await response.json();
  const { visibility, timezone, main, weather, name, wind } = json;

  console.log(main);
  console.log(json);
  updateNavValues(
    weather[0].description,
    name,
    "Monday, 27th Nov 2023 8:27 pm",
    main.temp
  );
  const sunset = new Date(json.sys.sunset * 1000 + timezone * 1000)
    .toUTCString()
    .slice(-12, -7);

  const sunrise = new Date(json.sys.sunrise * 1000 + timezone * 1000)
    .toUTCString()
    .slice(-12, -7);
  console.log(sunset, sunrise);
  updateCellValues(
    sunrise,
    sunset,
    main.pressure,
    wind.deg,
    main.feels_like,
    main.humidity,
    visibility,
    wind.speed
  );
}

async function requestForecast(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=imperial`
  );
  const json = await response.json();
  const {
    city: { sunset },
    list,
  } = json;

  console.log(list);
  const highs = [
    Math.round(list[0].main.temp_max),
    Math.round(list[7].main.temp_max),
    Math.round(list[15].main.temp_max),
    Math.round(list[23].main.temp_max),
    Math.round(list[31].main.temp_max),
    Math.round(list[39].main.temp_max),
    Math.round(list[39].main.temp_max),
  ];
  const lows = [
    Math.round(list[0].main.temp_min),
    Math.round(list[7].main.temp_min),
    Math.round(list[15].main.temp_min),
    Math.round(list[23].main.temp_min),
    Math.round(list[31].main.temp_min),
    Math.round(list[39].main.temp_min),
    Math.round(list[39].main.temp_min),
  ];
  updateForecastValues(highs, lows);
}

document.getElementById("search-bar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    requestData(document.getElementById("search-bar").value);
    requestForecast(document.getElementById("search-bar").value);
  }
});
export { requestData, requestForecast };
