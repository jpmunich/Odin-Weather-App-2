/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UIController.js":
/*!*****************************!*\
  !*** ./src/UIController.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createElementWithClass: () => (/* binding */ createElementWithClass),
/* harmony export */   createForecastCell: () => (/* binding */ createForecastCell),
/* harmony export */   createTextElement: () => (/* binding */ createTextElement),
/* harmony export */   createWeatherCell: () => (/* binding */ createWeatherCell)
/* harmony export */ });
const createElement = (type, parent) => {
  const element = document.createElement(type);
  parent.appendChild(element);
  return element;
};

const createTextElement = (type, parent, text) => {
  const element = document.createElement(type);
  parent.appendChild(element);
  element.innerText = text;
  return element;
};

const createElementWithClass = (type, parent, className) => {
  const element = document.createElement(type);
  element.classList.add(className);
  parent.appendChild(element);
  return element;
};

const createWeatherCell = (parent, imgSrc, infoTypeText, infoText) => {
  const container = createElementWithClass(
    "div",
    parent,
    "weather-cell-container"
  );
  const iconContainer = createElementWithClass(
    "div",
    container,
    "icon-container"
  );
  const textContainer = createElementWithClass(
    "div",
    container,
    "weather-text-container"
  );

  const icon = createElementWithClass("img", iconContainer, "weather-cell-img");
  icon.src = imgSrc;

  const infoType = createTextElement("h6", textContainer, infoTypeText);
  infoType.classList.add("info-text");
  const info = createTextElement("h3", textContainer, `${infoText}`);
  info.classList.add("info-text");

  return info;
};

const createForecastCell = (parent, imgSrc, dayText, highText, lowText) => {
  const container = createElementWithClass(
    "div",
    parent,
    "forecast-cell-container"
  );

  const day = createTextElement("h4", container, dayText);
  day.classList.add("forecast-day");
  const tempContainer = createElementWithClass(
    "div",
    container,
    "forecast-temp-container"
  );
  const temperatureHigh = createTextElement(
    "h2",
    tempContainer,
    `${highText} °F`
  );
  temperatureHigh.classList.add("temp-high");
  const temperatureLow = createTextElement(
    "h6",
    tempContainer,
    `${lowText} °F`
  );
  temperatureLow.classList.add("temp-low");

  const forecastImage = createElementWithClass(
    "img",
    container,
    "forecast-img"
  );
  forecastImage.src = imgSrc;
};




/***/ }),

/***/ "./src/apiController.js":
/*!******************************!*\
  !*** ./src/apiController.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestData: () => (/* binding */ requestData),
/* harmony export */   requestForecast: () => (/* binding */ requestForecast)
/* harmony export */ });
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ "./src/home.js");


const key = "170fee3662f94ec3d6b36434fe3d4c00";
let units = "imperial";
let selectedCity = "Seattle";

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`
  );
  const json = await response.json();
  const { visibility, timezone, main, weather, name, wind, dt } = json;

  const day = new Date(dt * 1000 + timezone * 1000).getDay();
  const hour = new Date(dt * 1000 + timezone * 1000).getUTCHours();

  const date = new Date(dt * 1000 + timezone * 1000).toUTCString().slice(0, 22);

  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateNavValues)(weather[0].description, name, date, Math.round(main.temp));

  const sunset = new Date(json.sys.sunset * 1000 + timezone * 1000)
    .toUTCString()
    .slice(-12, -7);

  const sunrise = new Date(json.sys.sunrise * 1000 + timezone * 1000)
    .toUTCString()
    .slice(-12, -7);

  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateCellValues)(
    sunrise,
    sunset,
    main.pressure,
    wind.deg,
    Math.round(main.feels_like),
    main.humidity,
    visibility,
    Math.round(wind.speed)
  );

  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateForecastDay)([day + 1, day + 2, day + 3, day + 4, day + 5]);

  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateBackground)(weather[0].main, hour);

  console.log(json);
}

async function requestForecast(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=${units}`
  );
  const json = await response.json();
  const { list } = json;

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

  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateForecastValues)(highs, lows);
}

document.getElementById("search-bar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    selectedCity = document.getElementById("search-bar").value;
    requestData(selectedCity);
    requestForecast(selectedCity);
  }
});

document.getElementById("toggle-units").addEventListener("click", () => {
  if (units === "imperial") units = "metric";
  else if (units === "metric") units = "imperial";
  requestData(selectedCity);
  requestForecast(selectedCity);
});



/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBackground: () => (/* binding */ createBackground),
/* harmony export */   updateBackground: () => (/* binding */ updateBackground),
/* harmony export */   updateCellValues: () => (/* binding */ updateCellValues),
/* harmony export */   updateForecastDay: () => (/* binding */ updateForecastDay),
/* harmony export */   updateForecastValues: () => (/* binding */ updateForecastValues),
/* harmony export */   updateNavValues: () => (/* binding */ updateNavValues)
/* harmony export */ });
/* harmony import */ var _UIController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIController.js */ "./src/UIController.js");


let units = "imperial";

const content = document.getElementById("content");
const topContent = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)("div", content, "top-content");

function createBackground() {
  content.style.backgroundImage = "url(../dist/images/landscape.jpg)";
}

function updateBackground(weather, time) {
  const random = Math.floor(Math.random() * 2);
  console.log(random);
  if (weather === "Rain" || weather === "Drizzle")
    content.style.backgroundImage = `url(../dist/images/rain.jpg)`;
  else if (weather === "Clear")
    content.style.backgroundImage = `url(../dist/images/landscape.jpg)`;
  else if (weather === "Thunderstorm" && random === 0)
    content.style.backgroundImage = `url(../dist/images/lightning-strike.jpg)`;
  else if (weather === "Thunderstorm" && random === 1)
    content.style.backgroundImage = `url(../dist/images/lightning.jpg)`;
  else if (weather === "Mist" || weather === "Fog")
    content.style.backgroundImage = `url(../dist/images/cloudy-forest.jpg)`;
  else if (weather === "Clouds")
    content.style.backgroundImage = `url(../dist/images/cloudy-day.jpg)`;
  else if (weather === "Smoke" || weather === "Haze")
    content.style.backgroundImage = `url(../dist/images/cloudy-forest.jpg)`;
  else if (weather === "Dust" || weather === "Sand")
    content.style.backgroundImage = `url(../dist/images/desert.jpg)`;
  else if (weather === "Snow" && random === 0)
    content.style.backgroundImage = `url(../dist/images/snow.jpg)`;
  else if (weather === "Snow" && random === 1)
    content.style.backgroundImage = `url(../dist/images/snowy-forest.jpg)`;
  else {
    content.style.backgroundImage = `url(../dist/images/landscape.jpg)`;
  }

  if (weather === "Clear" && (time >= 19 || time <= 8))
    content.style.backgroundImage = `url(../dist/images/night-time.jpg)`;
}

function createNav(weatherDescription, city, date, temperature) {
  const navContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    topContent,
    "nav-container"
  );

  const weatherText = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("h1", navContainer, weatherDescription);
  weatherText.setAttribute("id", "weather-description-text");
  const cityText = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("h4", navContainer, city);
  cityText.setAttribute("id", "city-description-text");
  const dateText = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("p", navContainer, date);
  dateText.setAttribute("id", "date-description-text");

  const temperatureText = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)(
    "h1",
    navContainer,
    `${temperature} °F`
  );

  temperatureText.classList.add("temperature-text");
  const toggleUnits = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("button", navContainer, "Display: °F");
  toggleUnits.setAttribute("id", "toggle-units");
  toggleUnits.addEventListener("click", () => {
    if (units === "imperial") {
      units = "metric";
      toggleUnits.innerText = `Display: °C`;
    } else if (units === "metric") {
      units = "imperial";
      toggleUnits.innerText = `Display: °F`;
    }
  });

  const weather = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)("img", navContainer, "weather-img");
  weather.src = "../dist/images/cloudy.svg";

  const searchContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    navContainer,
    "search-container"
  );
  const search = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", searchContainer);
  search.setAttribute("id", "search-bar");
  search.placeholder = "Search";

  const searchBar = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
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
  if (units === "imperial") tempuratureText.innerText = `${temperature} °F`;
  else if (units === "metric") tempuratureText.innerText = `${temperature} °C`;
}

function createWeatherCellGrid(
  sunrise,
  sunset,
  pressure,
  windDirection,
  temp,
  humidity,
  visibility,
  wind
) {
  const cellContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    topContent,
    "cell-container"
  );

  const leftCellContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    cellContainer,
    "left-cell-container"
  );

  const rightCellcontainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    cellContainer,
    "right-cell-container"
  );

  const sunriseCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    leftCellContainer,
    "../dist/images/sunrise.svg",
    "Sunrise",
    sunrise
  );
  sunriseCell.setAttribute("id", "sunrise-cell");

  const sunsetCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    leftCellContainer,
    "../dist/images/sunset.svg",
    "Sunset",
    sunset
  );
  sunsetCell.setAttribute("id", "sunset-cell");

  const pressureCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    leftCellContainer,
    "../dist/images/target.svg",
    "Pressure",
    pressure
  );
  pressureCell.setAttribute("id", "pressure-cell");

  const windDirectionCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    leftCellContainer,
    "../dist/images/wind.svg",
    "Wind Direction",
    windDirection
  );
  windDirectionCell.setAttribute("id", "wind-direction-cell");

  const feelsLikeCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    rightCellcontainer,
    "../dist/images/thermometer.svg",
    "Feels Like",
    `${temp} °F`
  );
  feelsLikeCell.setAttribute("id", "feels-like-cell");

  const humidityCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    rightCellcontainer,
    "../dist/images/droplet.svg",
    "Humidity",
    humidity
  );
  humidityCell.setAttribute("id", "humidity-cell");

  const visibilityCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    rightCellcontainer,
    "../dist/images/eye.svg",
    "Visibility",
    visibility
  );
  visibilityCell.setAttribute("id", "visibility-cell");

  const windCell = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    rightCellcontainer,
    "../dist/images/wind.svg",
    "Wind Speed",
    wind
  );
  windCell.setAttribute("id", "wind-cell");
}

function updateCellValues(
  sunrise,
  sunset,
  pressure,
  windDirection,
  temp,
  humidity,
  visibility,
  wind
) {
  const sunriseCell = document.getElementById("sunrise-cell");
  sunriseCell.innerText = `${sunrise}`;
  const sunsetCell = document.getElementById("sunset-cell");
  sunsetCell.innerText = `${sunset}`;
  const pressureCell = document.getElementById("pressure-cell");
  pressureCell.innerText = `${pressure}mb`;
  const windDirectionCell = document.getElementById("wind-direction-cell");
  windDirectionCell.innerText = `${windDirection}°`;
  const feelsLikeCell = document.getElementById("feels-like-cell");
  if (units === "imperial") feelsLikeCell.innerText = `${temp} °F`;
  else if (units === "metric") feelsLikeCell.innerText = `${temp} °C`;

  const humidityCell = document.getElementById("humidity-cell");
  humidityCell.innerText = `${humidity}%`;
  const visibilityCell = document.getElementById("visibility-cell");
  visibilityCell.innerText = `${visibility}m`;
  const windCell = document.getElementById("wind-cell");
  if (units === "imperial") windCell.innerText = `${wind}mph`;
  else if (units === "metric") windCell.innerText = `${wind} m/s`;
}

function createForecast(highs, lows) {
  const toggleContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    content,
    "toggle-container"
  );
  const toggleForecastDaily = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)(
    "button",
    toggleContainer,
    "Daily Forecast"
  );
  toggleForecastDaily.setAttribute("id", "toggle-forecast-daily");

  const forecastContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    content,
    "forecast-container"
  );

  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Sunday",
    highs[0],
    lows[0]
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Monday",
    highs[1],
    lows[1]
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Tuesday",
    highs[2],
    lows[2]
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Wednesday",
    highs[3],
    lows[3]
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(
    forecastContainer,
    "../dist/images/cloudy.svg",
    "Thursday",
    highs[4],
    lows[4]
  );
}

function updateForecastValues(highs, lows) {
  for (
    let i = 0;
    i < document.getElementsByClassName("temp-high").length;
    i++
  ) {
    if (units === "imperial") {
      document.getElementsByClassName("temp-high")[
        i
      ].innerText = `${highs[i]} °F`;
      document.getElementsByClassName("temp-low")[
        i
      ].innerText = `${lows[i]} °F`;
    } else if (units === "metric") {
      document.getElementsByClassName("temp-high")[
        i
      ].innerText = `${highs[i]} °C`;
      document.getElementsByClassName("temp-low")[
        i
      ].innerText = `${lows[i]} °C`;
    }
  }
}

function updateForecastDay(day) {
  for (
    let i = 0;
    i < document.getElementsByClassName("temp-high").length;
    i++
  ) {
    if (day[i] % 7 === 0)
      document.getElementsByClassName("forecast-day")[i].innerText = `Sunday`;
    else if (day[i] % 7 === 1)
      document.getElementsByClassName("forecast-day")[i].innerText = `Monday`;
    else if (day[i] % 7 === 2)
      document.getElementsByClassName("forecast-day")[i].innerText = `Tuesday`;
    else if (day[i] % 7 === 3)
      document.getElementsByClassName("forecast-day")[
        i
      ].innerText = `Wednesday`;
    else if (day[i] % 7 === 4)
      document.getElementsByClassName("forecast-day")[i].innerText = `Thursday`;
    else if (day[i] % 7 === 5)
      document.getElementsByClassName("forecast-day")[i].innerText = `Friday`;
    else if (day[i] % 7 === 6)
      document.getElementsByClassName("forecast-day")[i].innerText = `Saturday`;
  }
}

createNav("Cloudy", "Seattle", "Monday, 27th Nov 2023 8:27 pm", "47");
createWeatherCellGrid(
  "7:30",
  "8:00",
  "1040",
  "100°",
  17,
  "58%",
  "10000m",
  "14 mph"
);
createForecast([43, 44, 45, 46, 47, 42, 39], [39, 40, 42, 42, 42, 39, 34]);




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiController.js */ "./src/apiController.js");
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.js */ "./src/home.js");


(0,_home_js__WEBPACK_IMPORTED_MODULE_1__.createBackground)();
(0,_apiController_js__WEBPACK_IMPORTED_MODULE_0__.requestData)("Seattle");
(0,_apiController_js__WEBPACK_IMPORTED_MODULE_0__.requestForecast)("Seattle");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7OztBQ05rRTtBQUNyQjtBQUM3QywwREFBZ0I7QUFDaEIsOERBQVc7QUFDWCxrRUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlci1hcHAtMi8uL3NyYy9VSUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yLy4vc3JjL2FwaUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yLy4vc3JjL2hvbWUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAtMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuY29uc3QgY3JlYXRlVGV4dEVsZW1lbnQgPSAodHlwZSwgcGFyZW50LCB0ZXh0KSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGV4dDtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBjcmVhdGVFbGVtZW50V2l0aENsYXNzID0gKHR5cGUsIHBhcmVudCwgY2xhc3NOYW1lKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmNvbnN0IGNyZWF0ZVdlYXRoZXJDZWxsID0gKHBhcmVudCwgaW1nU3JjLCBpbmZvVHlwZVRleHQsIGluZm9UZXh0KSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBwYXJlbnQsXG4gICAgXCJ3ZWF0aGVyLWNlbGwtY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3QgaWNvbkNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250YWluZXIsXG4gICAgXCJpY29uLWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHRleHRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgY29udGFpbmVyLFxuICAgIFwid2VhdGhlci10ZXh0LWNvbnRhaW5lclwiXG4gICk7XG5cbiAgY29uc3QgaWNvbiA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXCJpbWdcIiwgaWNvbkNvbnRhaW5lciwgXCJ3ZWF0aGVyLWNlbGwtaW1nXCIpO1xuICBpY29uLnNyYyA9IGltZ1NyYztcblxuICBjb25zdCBpbmZvVHlwZSA9IGNyZWF0ZVRleHRFbGVtZW50KFwiaDZcIiwgdGV4dENvbnRhaW5lciwgaW5mb1R5cGVUZXh0KTtcbiAgaW5mb1R5cGUuY2xhc3NMaXN0LmFkZChcImluZm8tdGV4dFwiKTtcbiAgY29uc3QgaW5mbyA9IGNyZWF0ZVRleHRFbGVtZW50KFwiaDNcIiwgdGV4dENvbnRhaW5lciwgYCR7aW5mb1RleHR9YCk7XG4gIGluZm8uY2xhc3NMaXN0LmFkZChcImluZm8tdGV4dFwiKTtcblxuICByZXR1cm4gaW5mbztcbn07XG5cbmNvbnN0IGNyZWF0ZUZvcmVjYXN0Q2VsbCA9IChwYXJlbnQsIGltZ1NyYywgZGF5VGV4dCwgaGlnaFRleHQsIGxvd1RleHQpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHBhcmVudCxcbiAgICBcImZvcmVjYXN0LWNlbGwtY29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCBkYXkgPSBjcmVhdGVUZXh0RWxlbWVudChcImg0XCIsIGNvbnRhaW5lciwgZGF5VGV4dCk7XG4gIGRheS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtZGF5XCIpO1xuICBjb25zdCB0ZW1wQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRhaW5lcixcbiAgICBcImZvcmVjYXN0LXRlbXAtY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3QgdGVtcGVyYXR1cmVIaWdoID0gY3JlYXRlVGV4dEVsZW1lbnQoXG4gICAgXCJoMlwiLFxuICAgIHRlbXBDb250YWluZXIsXG4gICAgYCR7aGlnaFRleHR9IMKwRmBcbiAgKTtcbiAgdGVtcGVyYXR1cmVIaWdoLmNsYXNzTGlzdC5hZGQoXCJ0ZW1wLWhpZ2hcIik7XG4gIGNvbnN0IHRlbXBlcmF0dXJlTG93ID0gY3JlYXRlVGV4dEVsZW1lbnQoXG4gICAgXCJoNlwiLFxuICAgIHRlbXBDb250YWluZXIsXG4gICAgYCR7bG93VGV4dH0gwrBGYFxuICApO1xuICB0ZW1wZXJhdHVyZUxvdy5jbGFzc0xpc3QuYWRkKFwidGVtcC1sb3dcIik7XG5cbiAgY29uc3QgZm9yZWNhc3RJbWFnZSA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJpbWdcIixcbiAgICBjb250YWluZXIsXG4gICAgXCJmb3JlY2FzdC1pbWdcIlxuICApO1xuICBmb3JlY2FzdEltYWdlLnNyYyA9IGltZ1NyYztcbn07XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNyZWF0ZVRleHRFbGVtZW50LFxuICBjcmVhdGVFbGVtZW50V2l0aENsYXNzLFxuICBjcmVhdGVXZWF0aGVyQ2VsbCxcbiAgY3JlYXRlRm9yZWNhc3RDZWxsLFxufTtcbiIsImltcG9ydCB7XG4gIHVwZGF0ZUNlbGxWYWx1ZXMsXG4gIHVwZGF0ZUZvcmVjYXN0VmFsdWVzLFxuICB1cGRhdGVOYXZWYWx1ZXMsXG4gIHVwZGF0ZUZvcmVjYXN0RGF5LFxuICB1cGRhdGVCYWNrZ3JvdW5kLFxufSBmcm9tIFwiLi9ob21lXCI7XG5cbmNvbnN0IGtleSA9IFwiMTcwZmVlMzY2MmY5NGVjM2Q2YjM2NDM0ZmUzZDRjMDBcIjtcbmxldCB1bml0cyA9IFwiaW1wZXJpYWxcIjtcbmxldCBzZWxlY3RlZENpdHkgPSBcIlNlYXR0bGVcIjtcblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdERhdGEoY2l0eSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mYXBwaWQ9JHtrZXl9JnVuaXRzPSR7dW5pdHN9YFxuICApO1xuICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBjb25zdCB7IHZpc2liaWxpdHksIHRpbWV6b25lLCBtYWluLCB3ZWF0aGVyLCBuYW1lLCB3aW5kLCBkdCB9ID0ganNvbjtcblxuICBjb25zdCBkYXkgPSBuZXcgRGF0ZShkdCAqIDEwMDAgKyB0aW1lem9uZSAqIDEwMDApLmdldERheSgpO1xuICBjb25zdCBob3VyID0gbmV3IERhdGUoZHQgKiAxMDAwICsgdGltZXpvbmUgKiAxMDAwKS5nZXRVVENIb3VycygpO1xuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkdCAqIDEwMDAgKyB0aW1lem9uZSAqIDEwMDApLnRvVVRDU3RyaW5nKCkuc2xpY2UoMCwgMjIpO1xuXG4gIHVwZGF0ZU5hdlZhbHVlcyh3ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLCBuYW1lLCBkYXRlLCBNYXRoLnJvdW5kKG1haW4udGVtcCkpO1xuXG4gIGNvbnN0IHN1bnNldCA9IG5ldyBEYXRlKGpzb24uc3lzLnN1bnNldCAqIDEwMDAgKyB0aW1lem9uZSAqIDEwMDApXG4gICAgLnRvVVRDU3RyaW5nKClcbiAgICAuc2xpY2UoLTEyLCAtNyk7XG5cbiAgY29uc3Qgc3VucmlzZSA9IG5ldyBEYXRlKGpzb24uc3lzLnN1bnJpc2UgKiAxMDAwICsgdGltZXpvbmUgKiAxMDAwKVxuICAgIC50b1VUQ1N0cmluZygpXG4gICAgLnNsaWNlKC0xMiwgLTcpO1xuXG4gIHVwZGF0ZUNlbGxWYWx1ZXMoXG4gICAgc3VucmlzZSxcbiAgICBzdW5zZXQsXG4gICAgbWFpbi5wcmVzc3VyZSxcbiAgICB3aW5kLmRlZyxcbiAgICBNYXRoLnJvdW5kKG1haW4uZmVlbHNfbGlrZSksXG4gICAgbWFpbi5odW1pZGl0eSxcbiAgICB2aXNpYmlsaXR5LFxuICAgIE1hdGgucm91bmQod2luZC5zcGVlZClcbiAgKTtcblxuICB1cGRhdGVGb3JlY2FzdERheShbZGF5ICsgMSwgZGF5ICsgMiwgZGF5ICsgMywgZGF5ICsgNCwgZGF5ICsgNV0pO1xuXG4gIHVwZGF0ZUJhY2tncm91bmQod2VhdGhlclswXS5tYWluLCBob3VyKTtcblxuICBjb25zb2xlLmxvZyhqc29uKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEZvcmVjYXN0KGNpdHkpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSZhcHBpZD0ke2tleX0mdW5pdHM9JHt1bml0c31gXG4gICk7XG4gIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIGNvbnN0IHsgbGlzdCB9ID0ganNvbjtcblxuICBjb25zdCBoaWdocyA9IFtcbiAgICBNYXRoLnJvdW5kKGxpc3RbMV0ubWFpbi50ZW1wX21heCksXG4gICAgTWF0aC5yb3VuZChsaXN0WzldLm1haW4udGVtcF9tYXgpLFxuICAgIE1hdGgucm91bmQobGlzdFsxNV0ubWFpbi50ZW1wX21heCksXG4gICAgTWF0aC5yb3VuZChsaXN0WzIzXS5tYWluLnRlbXBfbWF4KSxcbiAgICBNYXRoLnJvdW5kKGxpc3RbMzFdLm1haW4udGVtcF9tYXgpLFxuICBdO1xuICBjb25zdCBsb3dzID0gW1xuICAgIE1hdGgucm91bmQobGlzdFsxXS5tYWluLnRlbXBfbWluKSxcbiAgICBNYXRoLnJvdW5kKGxpc3RbOV0ubWFpbi50ZW1wX21pbiksXG4gICAgTWF0aC5yb3VuZChsaXN0WzE1XS5tYWluLnRlbXBfbWluKSxcbiAgICBNYXRoLnJvdW5kKGxpc3RbMjNdLm1haW4udGVtcF9taW4pLFxuICAgIE1hdGgucm91bmQobGlzdFszMV0ubWFpbi50ZW1wX21pbiksXG4gIF07XG5cbiAgdXBkYXRlRm9yZWNhc3RWYWx1ZXMoaGlnaHMsIGxvd3MpO1xufVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1iYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgc2VsZWN0ZWRDaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYmFyXCIpLnZhbHVlO1xuICAgIHJlcXVlc3REYXRhKHNlbGVjdGVkQ2l0eSk7XG4gICAgcmVxdWVzdEZvcmVjYXN0KHNlbGVjdGVkQ2l0eSk7XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZ2dsZS11bml0c1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAodW5pdHMgPT09IFwiaW1wZXJpYWxcIikgdW5pdHMgPSBcIm1ldHJpY1wiO1xuICBlbHNlIGlmICh1bml0cyA9PT0gXCJtZXRyaWNcIikgdW5pdHMgPSBcImltcGVyaWFsXCI7XG4gIHJlcXVlc3REYXRhKHNlbGVjdGVkQ2l0eSk7XG4gIHJlcXVlc3RGb3JlY2FzdChzZWxlY3RlZENpdHkpO1xufSk7XG5leHBvcnQgeyByZXF1ZXN0RGF0YSwgcmVxdWVzdEZvcmVjYXN0IH07XG4iLCJpbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LFxuICBjcmVhdGVUZXh0RWxlbWVudCxcbiAgY3JlYXRlRWxlbWVudFdpdGhDbGFzcyxcbiAgY3JlYXRlV2VhdGhlckNlbGwsXG4gIGNyZWF0ZUZvcmVjYXN0Q2VsbCxcbn0gZnJvbSBcIi4vVUlDb250cm9sbGVyLmpzXCI7XG5cbmxldCB1bml0cyA9IFwiaW1wZXJpYWxcIjtcblxuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcbmNvbnN0IHRvcENvbnRlbnQgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFwiZGl2XCIsIGNvbnRlbnQsIFwidG9wLWNvbnRlbnRcIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJhY2tncm91bmQoKSB7XG4gIGNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoLi4vZGlzdC9pbWFnZXMvbGFuZHNjYXBlLmpwZylcIjtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQmFja2dyb3VuZCh3ZWF0aGVyLCB0aW1lKSB7XG4gIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICBjb25zb2xlLmxvZyhyYW5kb20pO1xuICBpZiAod2VhdGhlciA9PT0gXCJSYWluXCIgfHwgd2VhdGhlciA9PT0gXCJEcml6emxlXCIpXG4gICAgY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC4uL2Rpc3QvaW1hZ2VzL3JhaW4uanBnKWA7XG4gIGVsc2UgaWYgKHdlYXRoZXIgPT09IFwiQ2xlYXJcIilcbiAgICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoLi4vZGlzdC9pbWFnZXMvbGFuZHNjYXBlLmpwZylgO1xuICBlbHNlIGlmICh3ZWF0aGVyID09PSBcIlRodW5kZXJzdG9ybVwiICYmIHJhbmRvbSA9PT0gMClcbiAgICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoLi4vZGlzdC9pbWFnZXMvbGlnaHRuaW5nLXN0cmlrZS5qcGcpYDtcbiAgZWxzZSBpZiAod2VhdGhlciA9PT0gXCJUaHVuZGVyc3Rvcm1cIiAmJiByYW5kb20gPT09IDEpXG4gICAgY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC4uL2Rpc3QvaW1hZ2VzL2xpZ2h0bmluZy5qcGcpYDtcbiAgZWxzZSBpZiAod2VhdGhlciA9PT0gXCJNaXN0XCIgfHwgd2VhdGhlciA9PT0gXCJGb2dcIilcbiAgICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoLi4vZGlzdC9pbWFnZXMvY2xvdWR5LWZvcmVzdC5qcGcpYDtcbiAgZWxzZSBpZiAod2VhdGhlciA9PT0gXCJDbG91ZHNcIilcbiAgICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoLi4vZGlzdC9pbWFnZXMvY2xvdWR5LWRheS5qcGcpYDtcbiAgZWxzZSBpZiAod2VhdGhlciA9PT0gXCJTbW9rZVwiIHx8IHdlYXRoZXIgPT09IFwiSGF6ZVwiKVxuICAgIGNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCguLi9kaXN0L2ltYWdlcy9jbG91ZHktZm9yZXN0LmpwZylgO1xuICBlbHNlIGlmICh3ZWF0aGVyID09PSBcIkR1c3RcIiB8fCB3ZWF0aGVyID09PSBcIlNhbmRcIilcbiAgICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoLi4vZGlzdC9pbWFnZXMvZGVzZXJ0LmpwZylgO1xuICBlbHNlIGlmICh3ZWF0aGVyID09PSBcIlNub3dcIiAmJiByYW5kb20gPT09IDApXG4gICAgY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC4uL2Rpc3QvaW1hZ2VzL3Nub3cuanBnKWA7XG4gIGVsc2UgaWYgKHdlYXRoZXIgPT09IFwiU25vd1wiICYmIHJhbmRvbSA9PT0gMSlcbiAgICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoLi4vZGlzdC9pbWFnZXMvc25vd3ktZm9yZXN0LmpwZylgO1xuICBlbHNlIHtcbiAgICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoLi4vZGlzdC9pbWFnZXMvbGFuZHNjYXBlLmpwZylgO1xuICB9XG5cbiAgaWYgKHdlYXRoZXIgPT09IFwiQ2xlYXJcIiAmJiAodGltZSA+PSAxOSB8fCB0aW1lIDw9IDgpKVxuICAgIGNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCguLi9kaXN0L2ltYWdlcy9uaWdodC10aW1lLmpwZylgO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOYXYod2VhdGhlckRlc2NyaXB0aW9uLCBjaXR5LCBkYXRlLCB0ZW1wZXJhdHVyZSkge1xuICBjb25zdCBuYXZDb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgdG9wQ29udGVudCxcbiAgICBcIm5hdi1jb250YWluZXJcIlxuICApO1xuXG4gIGNvbnN0IHdlYXRoZXJUZXh0ID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoMVwiLCBuYXZDb250YWluZXIsIHdlYXRoZXJEZXNjcmlwdGlvbik7XG4gIHdlYXRoZXJUZXh0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwid2VhdGhlci1kZXNjcmlwdGlvbi10ZXh0XCIpO1xuICBjb25zdCBjaXR5VGV4dCA9IGNyZWF0ZVRleHRFbGVtZW50KFwiaDRcIiwgbmF2Q29udGFpbmVyLCBjaXR5KTtcbiAgY2l0eVRleHQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjaXR5LWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IGRhdGVUZXh0ID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJwXCIsIG5hdkNvbnRhaW5lciwgZGF0ZSk7XG4gIGRhdGVUZXh0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGF0ZS1kZXNjcmlwdGlvbi10ZXh0XCIpO1xuXG4gIGNvbnN0IHRlbXBlcmF0dXJlVGV4dCA9IGNyZWF0ZVRleHRFbGVtZW50KFxuICAgIFwiaDFcIixcbiAgICBuYXZDb250YWluZXIsXG4gICAgYCR7dGVtcGVyYXR1cmV9IMKwRmBcbiAgKTtcblxuICB0ZW1wZXJhdHVyZVRleHQuY2xhc3NMaXN0LmFkZChcInRlbXBlcmF0dXJlLXRleHRcIik7XG4gIGNvbnN0IHRvZ2dsZVVuaXRzID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJidXR0b25cIiwgbmF2Q29udGFpbmVyLCBcIkRpc3BsYXk6IMKwRlwiKTtcbiAgdG9nZ2xlVW5pdHMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2dnbGUtdW5pdHNcIik7XG4gIHRvZ2dsZVVuaXRzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKHVuaXRzID09PSBcImltcGVyaWFsXCIpIHtcbiAgICAgIHVuaXRzID0gXCJtZXRyaWNcIjtcbiAgICAgIHRvZ2dsZVVuaXRzLmlubmVyVGV4dCA9IGBEaXNwbGF5OiDCsENgO1xuICAgIH0gZWxzZSBpZiAodW5pdHMgPT09IFwibWV0cmljXCIpIHtcbiAgICAgIHVuaXRzID0gXCJpbXBlcmlhbFwiO1xuICAgICAgdG9nZ2xlVW5pdHMuaW5uZXJUZXh0ID0gYERpc3BsYXk6IMKwRmA7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCB3ZWF0aGVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcImltZ1wiLCBuYXZDb250YWluZXIsIFwid2VhdGhlci1pbWdcIik7XG4gIHdlYXRoZXIuc3JjID0gXCIuLi9kaXN0L2ltYWdlcy9jbG91ZHkuc3ZnXCI7XG5cbiAgY29uc3Qgc2VhcmNoQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIG5hdkNvbnRhaW5lcixcbiAgICBcInNlYXJjaC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBzZWFyY2ggPSBjcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgc2VhcmNoQ29udGFpbmVyKTtcbiAgc2VhcmNoLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2VhcmNoLWJhclwiKTtcbiAgc2VhcmNoLnBsYWNlaG9sZGVyID0gXCJTZWFyY2hcIjtcblxuICBjb25zdCBzZWFyY2hCYXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiaW1nXCIsXG4gICAgc2VhcmNoQ29udGFpbmVyLFxuICAgIFwic2VhcmNoLWltZ1wiXG4gICk7XG4gIHNlYXJjaEJhci5zcmMgPSBcIi4uL2Rpc3QvaW1hZ2VzL3NlYXJjaC5zdmdcIjtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTmF2VmFsdWVzKHdlYXRoZXJEZXNjcmlwdGlvbiwgY2l0eSwgZGF0ZSwgdGVtcGVyYXR1cmUpIHtcbiAgY29uc3Qgd2VhdGhlclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItZGVzY3JpcHRpb24tdGV4dFwiKTtcbiAgY29uc3QgY2l0eVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktZGVzY3JpcHRpb24tdGV4dFwiKTtcbiAgY29uc3QgZGF0ZVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGUtZGVzY3JpcHRpb24tdGV4dFwiKTtcbiAgY29uc3QgdGVtcHVyYXR1cmVUZXh0ID1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGVtcGVyYXR1cmUtdGV4dFwiKVswXTtcblxuICB3ZWF0aGVyVGV4dC5pbm5lclRleHQgPSB3ZWF0aGVyRGVzY3JpcHRpb247XG4gIGNpdHlUZXh0LmlubmVyVGV4dCA9IGNpdHk7XG4gIGRhdGVUZXh0LmlubmVyVGV4dCA9IGRhdGU7XG4gIGlmICh1bml0cyA9PT0gXCJpbXBlcmlhbFwiKSB0ZW1wdXJhdHVyZVRleHQuaW5uZXJUZXh0ID0gYCR7dGVtcGVyYXR1cmV9IMKwRmA7XG4gIGVsc2UgaWYgKHVuaXRzID09PSBcIm1ldHJpY1wiKSB0ZW1wdXJhdHVyZVRleHQuaW5uZXJUZXh0ID0gYCR7dGVtcGVyYXR1cmV9IMKwQ2A7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdlYXRoZXJDZWxsR3JpZChcbiAgc3VucmlzZSxcbiAgc3Vuc2V0LFxuICBwcmVzc3VyZSxcbiAgd2luZERpcmVjdGlvbixcbiAgdGVtcCxcbiAgaHVtaWRpdHksXG4gIHZpc2liaWxpdHksXG4gIHdpbmRcbikge1xuICBjb25zdCBjZWxsQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHRvcENvbnRlbnQsXG4gICAgXCJjZWxsLWNvbnRhaW5lclwiXG4gICk7XG5cbiAgY29uc3QgbGVmdENlbGxDb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgY2VsbENvbnRhaW5lcixcbiAgICBcImxlZnQtY2VsbC1jb250YWluZXJcIlxuICApO1xuXG4gIGNvbnN0IHJpZ2h0Q2VsbGNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjZWxsQ29udGFpbmVyLFxuICAgIFwicmlnaHQtY2VsbC1jb250YWluZXJcIlxuICApO1xuXG4gIGNvbnN0IHN1bnJpc2VDZWxsID0gY3JlYXRlV2VhdGhlckNlbGwoXG4gICAgbGVmdENlbGxDb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy9zdW5yaXNlLnN2Z1wiLFxuICAgIFwiU3VucmlzZVwiLFxuICAgIHN1bnJpc2VcbiAgKTtcbiAgc3VucmlzZUNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdW5yaXNlLWNlbGxcIik7XG5cbiAgY29uc3Qgc3Vuc2V0Q2VsbCA9IGNyZWF0ZVdlYXRoZXJDZWxsKFxuICAgIGxlZnRDZWxsQ29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvc3Vuc2V0LnN2Z1wiLFxuICAgIFwiU3Vuc2V0XCIsXG4gICAgc3Vuc2V0XG4gICk7XG4gIHN1bnNldENlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdW5zZXQtY2VsbFwiKTtcblxuICBjb25zdCBwcmVzc3VyZUNlbGwgPSBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICBsZWZ0Q2VsbENvbnRhaW5lcixcbiAgICBcIi4uL2Rpc3QvaW1hZ2VzL3RhcmdldC5zdmdcIixcbiAgICBcIlByZXNzdXJlXCIsXG4gICAgcHJlc3N1cmVcbiAgKTtcbiAgcHJlc3N1cmVDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJlc3N1cmUtY2VsbFwiKTtcblxuICBjb25zdCB3aW5kRGlyZWN0aW9uQ2VsbCA9IGNyZWF0ZVdlYXRoZXJDZWxsKFxuICAgIGxlZnRDZWxsQ29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvd2luZC5zdmdcIixcbiAgICBcIldpbmQgRGlyZWN0aW9uXCIsXG4gICAgd2luZERpcmVjdGlvblxuICApO1xuICB3aW5kRGlyZWN0aW9uQ2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIndpbmQtZGlyZWN0aW9uLWNlbGxcIik7XG5cbiAgY29uc3QgZmVlbHNMaWtlQ2VsbCA9IGNyZWF0ZVdlYXRoZXJDZWxsKFxuICAgIHJpZ2h0Q2VsbGNvbnRhaW5lcixcbiAgICBcIi4uL2Rpc3QvaW1hZ2VzL3RoZXJtb21ldGVyLnN2Z1wiLFxuICAgIFwiRmVlbHMgTGlrZVwiLFxuICAgIGAke3RlbXB9IMKwRmBcbiAgKTtcbiAgZmVlbHNMaWtlQ2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImZlZWxzLWxpa2UtY2VsbFwiKTtcblxuICBjb25zdCBodW1pZGl0eUNlbGwgPSBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICByaWdodENlbGxjb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy9kcm9wbGV0LnN2Z1wiLFxuICAgIFwiSHVtaWRpdHlcIixcbiAgICBodW1pZGl0eVxuICApO1xuICBodW1pZGl0eUNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJodW1pZGl0eS1jZWxsXCIpO1xuXG4gIGNvbnN0IHZpc2liaWxpdHlDZWxsID0gY3JlYXRlV2VhdGhlckNlbGwoXG4gICAgcmlnaHRDZWxsY29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvZXllLnN2Z1wiLFxuICAgIFwiVmlzaWJpbGl0eVwiLFxuICAgIHZpc2liaWxpdHlcbiAgKTtcbiAgdmlzaWJpbGl0eUNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ2aXNpYmlsaXR5LWNlbGxcIik7XG5cbiAgY29uc3Qgd2luZENlbGwgPSBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICByaWdodENlbGxjb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy93aW5kLnN2Z1wiLFxuICAgIFwiV2luZCBTcGVlZFwiLFxuICAgIHdpbmRcbiAgKTtcbiAgd2luZENlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3aW5kLWNlbGxcIik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNlbGxWYWx1ZXMoXG4gIHN1bnJpc2UsXG4gIHN1bnNldCxcbiAgcHJlc3N1cmUsXG4gIHdpbmREaXJlY3Rpb24sXG4gIHRlbXAsXG4gIGh1bWlkaXR5LFxuICB2aXNpYmlsaXR5LFxuICB3aW5kXG4pIHtcbiAgY29uc3Qgc3VucmlzZUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1bnJpc2UtY2VsbFwiKTtcbiAgc3VucmlzZUNlbGwuaW5uZXJUZXh0ID0gYCR7c3VucmlzZX1gO1xuICBjb25zdCBzdW5zZXRDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5zZXQtY2VsbFwiKTtcbiAgc3Vuc2V0Q2VsbC5pbm5lclRleHQgPSBgJHtzdW5zZXR9YDtcbiAgY29uc3QgcHJlc3N1cmVDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVzc3VyZS1jZWxsXCIpO1xuICBwcmVzc3VyZUNlbGwuaW5uZXJUZXh0ID0gYCR7cHJlc3N1cmV9bWJgO1xuICBjb25zdCB3aW5kRGlyZWN0aW9uQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZC1kaXJlY3Rpb24tY2VsbFwiKTtcbiAgd2luZERpcmVjdGlvbkNlbGwuaW5uZXJUZXh0ID0gYCR7d2luZERpcmVjdGlvbn3CsGA7XG4gIGNvbnN0IGZlZWxzTGlrZUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzLWxpa2UtY2VsbFwiKTtcbiAgaWYgKHVuaXRzID09PSBcImltcGVyaWFsXCIpIGZlZWxzTGlrZUNlbGwuaW5uZXJUZXh0ID0gYCR7dGVtcH0gwrBGYDtcbiAgZWxzZSBpZiAodW5pdHMgPT09IFwibWV0cmljXCIpIGZlZWxzTGlrZUNlbGwuaW5uZXJUZXh0ID0gYCR7dGVtcH0gwrBDYDtcblxuICBjb25zdCBodW1pZGl0eUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5LWNlbGxcIik7XG4gIGh1bWlkaXR5Q2VsbC5pbm5lclRleHQgPSBgJHtodW1pZGl0eX0lYDtcbiAgY29uc3QgdmlzaWJpbGl0eUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2liaWxpdHktY2VsbFwiKTtcbiAgdmlzaWJpbGl0eUNlbGwuaW5uZXJUZXh0ID0gYCR7dmlzaWJpbGl0eX1tYDtcbiAgY29uc3Qgd2luZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmQtY2VsbFwiKTtcbiAgaWYgKHVuaXRzID09PSBcImltcGVyaWFsXCIpIHdpbmRDZWxsLmlubmVyVGV4dCA9IGAke3dpbmR9bXBoYDtcbiAgZWxzZSBpZiAodW5pdHMgPT09IFwibWV0cmljXCIpIHdpbmRDZWxsLmlubmVyVGV4dCA9IGAke3dpbmR9IG0vc2A7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcmVjYXN0KGhpZ2hzLCBsb3dzKSB7XG4gIGNvbnN0IHRvZ2dsZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250ZW50LFxuICAgIFwidG9nZ2xlLWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHRvZ2dsZUZvcmVjYXN0RGFpbHkgPSBjcmVhdGVUZXh0RWxlbWVudChcbiAgICBcImJ1dHRvblwiLFxuICAgIHRvZ2dsZUNvbnRhaW5lcixcbiAgICBcIkRhaWx5IEZvcmVjYXN0XCJcbiAgKTtcbiAgdG9nZ2xlRm9yZWNhc3REYWlseS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRvZ2dsZS1mb3JlY2FzdC1kYWlseVwiKTtcblxuICBjb25zdCBmb3JlY2FzdENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250ZW50LFxuICAgIFwiZm9yZWNhc3QtY29udGFpbmVyXCJcbiAgKTtcblxuICBjcmVhdGVGb3JlY2FzdENlbGwoXG4gICAgZm9yZWNhc3RDb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy9jbG91ZHkuc3ZnXCIsXG4gICAgXCJTdW5kYXlcIixcbiAgICBoaWdoc1swXSxcbiAgICBsb3dzWzBdXG4gICk7XG4gIGNyZWF0ZUZvcmVjYXN0Q2VsbChcbiAgICBmb3JlY2FzdENvbnRhaW5lcixcbiAgICBcIi4uL2Rpc3QvaW1hZ2VzL2Nsb3VkeS5zdmdcIixcbiAgICBcIk1vbmRheVwiLFxuICAgIGhpZ2hzWzFdLFxuICAgIGxvd3NbMV1cbiAgKTtcbiAgY3JlYXRlRm9yZWNhc3RDZWxsKFxuICAgIGZvcmVjYXN0Q29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvY2xvdWR5LnN2Z1wiLFxuICAgIFwiVHVlc2RheVwiLFxuICAgIGhpZ2hzWzJdLFxuICAgIGxvd3NbMl1cbiAgKTtcbiAgY3JlYXRlRm9yZWNhc3RDZWxsKFxuICAgIGZvcmVjYXN0Q29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvY2xvdWR5LnN2Z1wiLFxuICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgaGlnaHNbM10sXG4gICAgbG93c1szXVxuICApO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoXG4gICAgZm9yZWNhc3RDb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy9jbG91ZHkuc3ZnXCIsXG4gICAgXCJUaHVyc2RheVwiLFxuICAgIGhpZ2hzWzRdLFxuICAgIGxvd3NbNF1cbiAgKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3RWYWx1ZXMoaGlnaHMsIGxvd3MpIHtcbiAgZm9yIChcbiAgICBsZXQgaSA9IDA7XG4gICAgaSA8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wLWhpZ2hcIikubGVuZ3RoO1xuICAgIGkrK1xuICApIHtcbiAgICBpZiAodW5pdHMgPT09IFwiaW1wZXJpYWxcIikge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRlbXAtaGlnaFwiKVtcbiAgICAgICAgaVxuICAgICAgXS5pbm5lclRleHQgPSBgJHtoaWdoc1tpXX0gwrBGYDtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wLWxvd1wiKVtcbiAgICAgICAgaVxuICAgICAgXS5pbm5lclRleHQgPSBgJHtsb3dzW2ldfSDCsEZgO1xuICAgIH0gZWxzZSBpZiAodW5pdHMgPT09IFwibWV0cmljXCIpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wLWhpZ2hcIilbXG4gICAgICAgIGlcbiAgICAgIF0uaW5uZXJUZXh0ID0gYCR7aGlnaHNbaV19IMKwQ2A7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGVtcC1sb3dcIilbXG4gICAgICAgIGlcbiAgICAgIF0uaW5uZXJUZXh0ID0gYCR7bG93c1tpXX0gwrBDYDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3REYXkoZGF5KSB7XG4gIGZvciAoXG4gICAgbGV0IGkgPSAwO1xuICAgIGkgPCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGVtcC1oaWdoXCIpLmxlbmd0aDtcbiAgICBpKytcbiAgKSB7XG4gICAgaWYgKGRheVtpXSAlIDcgPT09IDApXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9yZWNhc3QtZGF5XCIpW2ldLmlubmVyVGV4dCA9IGBTdW5kYXlgO1xuICAgIGVsc2UgaWYgKGRheVtpXSAlIDcgPT09IDEpXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9yZWNhc3QtZGF5XCIpW2ldLmlubmVyVGV4dCA9IGBNb25kYXlgO1xuICAgIGVsc2UgaWYgKGRheVtpXSAlIDcgPT09IDIpXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9yZWNhc3QtZGF5XCIpW2ldLmlubmVyVGV4dCA9IGBUdWVzZGF5YDtcbiAgICBlbHNlIGlmIChkYXlbaV0gJSA3ID09PSAzKVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcmVjYXN0LWRheVwiKVtcbiAgICAgICAgaVxuICAgICAgXS5pbm5lclRleHQgPSBgV2VkbmVzZGF5YDtcbiAgICBlbHNlIGlmIChkYXlbaV0gJSA3ID09PSA0KVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcmVjYXN0LWRheVwiKVtpXS5pbm5lclRleHQgPSBgVGh1cnNkYXlgO1xuICAgIGVsc2UgaWYgKGRheVtpXSAlIDcgPT09IDUpXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9yZWNhc3QtZGF5XCIpW2ldLmlubmVyVGV4dCA9IGBGcmlkYXlgO1xuICAgIGVsc2UgaWYgKGRheVtpXSAlIDcgPT09IDYpXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9yZWNhc3QtZGF5XCIpW2ldLmlubmVyVGV4dCA9IGBTYXR1cmRheWA7XG4gIH1cbn1cblxuY3JlYXRlTmF2KFwiQ2xvdWR5XCIsIFwiU2VhdHRsZVwiLCBcIk1vbmRheSwgMjd0aCBOb3YgMjAyMyA4OjI3IHBtXCIsIFwiNDdcIik7XG5jcmVhdGVXZWF0aGVyQ2VsbEdyaWQoXG4gIFwiNzozMFwiLFxuICBcIjg6MDBcIixcbiAgXCIxMDQwXCIsXG4gIFwiMTAwwrBcIixcbiAgMTcsXG4gIFwiNTglXCIsXG4gIFwiMTAwMDBtXCIsXG4gIFwiMTQgbXBoXCJcbik7XG5jcmVhdGVGb3JlY2FzdChbNDMsIDQ0LCA0NSwgNDYsIDQ3LCA0MiwgMzldLCBbMzksIDQwLCA0MiwgNDIsIDQyLCAzOSwgMzRdKTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlQmFja2dyb3VuZCxcbiAgdXBkYXRlTmF2VmFsdWVzLFxuICB1cGRhdGVDZWxsVmFsdWVzLFxuICB1cGRhdGVGb3JlY2FzdFZhbHVlcyxcbiAgdXBkYXRlRm9yZWNhc3REYXksXG4gIHVwZGF0ZUJhY2tncm91bmQsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZXF1ZXN0RGF0YSwgcmVxdWVzdEZvcmVjYXN0IH0gZnJvbSBcIi4vYXBpQ29udHJvbGxlci5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlQmFja2dyb3VuZCB9IGZyb20gXCIuL2hvbWUuanNcIjtcbmNyZWF0ZUJhY2tncm91bmQoKTtcbnJlcXVlc3REYXRhKFwiU2VhdHRsZVwiKTtcbnJlcXVlc3RGb3JlY2FzdChcIlNlYXR0bGVcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=