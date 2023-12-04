import {
  updateCellValues,
  updateForecastValues,
  updateNavValues,
  updateForecastDay,
} from "./home";

const key = "170fee3662f94ec3d6b36434fe3d4c00";
let units = 'imperial';
let selectedCity = 'Seattle';

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`
  );
  const json = await response.json();
  const { visibility, timezone, main, weather, name, wind, dt } = json;

  const day = new Date(dt * 1000 + timezone * 1000).getDay();
  const date = new Date(dt * 1000 + timezone * 1000).toUTCString().slice(0, 22);

  updateNavValues(weather[0].description, name, date, Math.round(main.temp));
  const sunset = new Date(json.sys.sunset * 1000 + timezone * 1000)
    .toUTCString()
    .slice(-12, -7);

  const sunrise = new Date(json.sys.sunrise * 1000 + timezone * 1000)
    .toUTCString()
    .slice(-12, -7);

  updateCellValues(
    sunrise,
    sunset,
    main.pressure,
    wind.deg,
    Math.round(main.feels_like),
    main.humidity,
    visibility,
    Math.round(wind.speed)
  );

  updateForecastDay([
    day + 1,
    day + 2,
    day + 3,
    day + 4,
    day + 5,
  ]);
}

async function requestForecast(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${units}`
    );
  const json = await response.json();
  const {
    list
  } = json;

  const highs = [
    Math.round(list[1].main.temp_max),
    Math.round(list[9].main.temp_max),
    Math.round(list[15].main.temp_max),
    Math.round(list[23].main.temp_max),
    Math.round(list[31].main.temp_max),
  ];
  const lows = [
    Math.round(list[1].main.temp_min),
    Math.round(list[9].main.temp_min),
    Math.round(list[15].main.temp_min),
    Math.round(list[23].main.temp_min),
    Math.round(list[31].main.temp_min),
  ];

  updateForecastValues(highs, lows);
}

document.getElementById("search-bar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
      selectedCity = document.getElementById("search-bar").value;
    requestData(selectedCity);
    requestForecast(selectedCity);
  }
});

document.getElementById('toggle-units').addEventListener('click', () => {
    if (units === 'imperial') units = 'metric'
    else if (units === 'metric') units = 'imperial';
    requestData(selectedCity);
    requestForecast(selectedCity);
})
export { requestData, requestForecast };
