const key = "170fee3662f94ec3d6b36434fe3d4c00";

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
  );
  const json = await response.json();
  const { timezone, visibility, main } = json;

  timezoneText.innerText = timezone;
  visibilityText.innerText = visibility;
  console.log(main);
  console.log(json);
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

requestForecast("Seattle");

export { createBackground, requestData };
