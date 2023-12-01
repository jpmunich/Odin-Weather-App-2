import {
  updateCellValues,
  updateForecastValues,
  updateNavValues,
  updateForecastDay,
} from "./home";

const key = "170fee3662f94ec3d6b36434fe3d4c00";

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
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
    day,
    day + 1,
    day + 2,
    day + 3,
    day + 4,
    day + 5,
    day + 6,
  ]);
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

  console.log(json);
  const highs = [
    Math.round(list[1].main.temp_max),
    Math.round(list[9].main.temp_max),
    Math.round(list[15].main.temp_max),
    Math.round(list[23].main.temp_max),
    Math.round(list[31].main.temp_max),
    Math.round(list[39].main.temp_max),
    Math.round(list[39].main.temp_max),
  ];
  const lows = [
    Math.round(list[1].main.temp_min),
    Math.round(list[9].main.temp_min),
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
