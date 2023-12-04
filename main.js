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
  const temperatureHigh = createTextElement("h2", container, `${highText} °F`);
  temperatureHigh.classList.add("temp-high");
  const temperatureLow = createTextElement("h6", container, `${lowText} °F`);
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

  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateForecastDay)([
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

  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateForecastValues)(highs, lows);
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



/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBackground: () => (/* binding */ createBackground),
/* harmony export */   updateCellValues: () => (/* binding */ updateCellValues),
/* harmony export */   updateForecastDay: () => (/* binding */ updateForecastDay),
/* harmony export */   updateForecastValues: () => (/* binding */ updateForecastValues),
/* harmony export */   updateNavValues: () => (/* binding */ updateNavValues)
/* harmony export */ });
/* harmony import */ var _UIController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIController.js */ "./src/UIController.js");


let units = 'imperial';

const content = document.getElementById("content");
const topContent = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)("div", content, "top-content");

function createBackground() {
  content.style.backgroundImage = "url(../dist/images/landscape.jpg)";
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
  const toggleUnits = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)('button', navContainer, "Display: °F");
  toggleUnits.setAttribute('id', 'toggle-units');
  toggleUnits.addEventListener('click', () => {
      if (units === 'imperial') {
        units = 'metric';
          toggleUnits.innerText = `Display: °C`;
        }
      else if (units === 'metric') {
        units = 'imperial';
        toggleUnits.innerText = `Display: °F`;
      } 
  })


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
  const tempuratureText = document.getElementsByClassName("temperature-text")[0];

  weatherText.innerText = weatherDescription;
  cityText.innerText = city;
  dateText.innerText = date;
  if (units === 'imperial') tempuratureText.innerText = `${temperature} °F`;
  else if (units === 'metric') tempuratureText.innerText = `${temperature} °C`;
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
  if (units === 'imperial') feelsLikeCell.innerText = `${temp} °F`;
  else if (units === 'metric') feelsLikeCell.innerText = `${temp} °C`;

  const humidityCell = document.getElementById("humidity-cell");
  humidityCell.innerText = `${humidity}%`;
  const visibilityCell = document.getElementById("visibility-cell");
  visibilityCell.innerText = `${visibility}m`;
  const windCell = document.getElementById("wind-cell");
  if (units === 'imperial') windCell.innerText = `${wind}mph`;
  else if (units === 'metric') windCell.innerText = `${wind} m/s`;
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
  for (let i = 0; i < document.getElementsByClassName("temp-high").length; i++) {
    if (units === 'imperial') {
        document.getElementsByClassName("temp-high")[i].innerText = `${highs[i]} °F`;
        document.getElementsByClassName("temp-low")[i].innerText = `${lows[i]} °F`;
    }
    else if (units === 'metric') {
        document.getElementsByClassName("temp-high")[i].innerText = `${highs[i]} °C`;
        document.getElementsByClassName("temp-low")[i].innerText = `${lows[i]} °C`;
    }
  }
}

function updateForecastDay(day) {
  for (let i = 0; i < document.getElementsByClassName("temp-high").length; i++) {
    if (day[i] % 7 === 0) document.getElementsByClassName("forecast-day")[i].innerText = `Sunday`;
    else if (day[i] % 7 === 1) document.getElementsByClassName("forecast-day")[i].innerText = `Monday`;
    else if (day[i] % 7 === 2) document.getElementsByClassName("forecast-day")[i].innerText = `Tuesday`;
    else if (day[i] % 7 === 3) document.getElementsByClassName("forecast-day")[i].innerText = `Wednesday`;
    else if (day[i] % 7 === 4) document.getElementsByClassName("forecast-day")[i].innerText = `Thursday`;
    else if (day[i] % 7 === 5) document.getElementsByClassName("forecast-day")[i].innerText = `Friday`;
    else if (day[i] % 7 === 6) document.getElementsByClassName("forecast-day")[i].innerText = `Saturday`;
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
createForecast(
  [43, 44, 45, 46, 47, 42, 39],
  [39, 40, 42, 42, 42, 39, 34],
);




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG9FQUFrQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix5REFBeUQ7QUFDM0U7QUFDQSx1RUFBdUUsVUFBVTtBQUNqRixzRUFBc0UsU0FBUztBQUMvRTtBQUNBO0FBQ0EsdUVBQXVFLFVBQVU7QUFDakYsc0VBQXNFLFNBQVM7QUFDL0U7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHlEQUF5RDtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVFFOzs7Ozs7O1VDdFRGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmtFO0FBQ3JCO0FBQzdDLDBEQUFnQjtBQUNoQiw4REFBVztBQUNYLGtFQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yLy4vc3JjL1VJQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvLi9zcmMvYXBpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvLi9zcmMvaG9tZS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBjcmVhdGVUZXh0RWxlbWVudCA9ICh0eXBlLCBwYXJlbnQsIHRleHQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgZWxlbWVudC5pbm5lclRleHQgPSB0ZXh0O1xuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmNvbnN0IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MgPSAodHlwZSwgcGFyZW50LCBjbGFzc05hbWUpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuY29uc3QgY3JlYXRlV2VhdGhlckNlbGwgPSAocGFyZW50LCBpbWdTcmMsIGluZm9UeXBlVGV4dCwgaW5mb1RleHQpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHBhcmVudCxcbiAgICBcIndlYXRoZXItY2VsbC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBpY29uQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRhaW5lcixcbiAgICBcImljb24tY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3QgdGV4dENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250YWluZXIsXG4gICAgXCJ3ZWF0aGVyLXRleHQtY29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCBpY29uID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcImltZ1wiLCBpY29uQ29udGFpbmVyLCBcIndlYXRoZXItY2VsbC1pbWdcIik7XG4gIGljb24uc3JjID0gaW1nU3JjO1xuXG4gIGNvbnN0IGluZm9UeXBlID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoNlwiLCB0ZXh0Q29udGFpbmVyLCBpbmZvVHlwZVRleHQpO1xuICBpbmZvVHlwZS5jbGFzc0xpc3QuYWRkKFwiaW5mby10ZXh0XCIpO1xuICBjb25zdCBpbmZvID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoM1wiLCB0ZXh0Q29udGFpbmVyLCBgJHtpbmZvVGV4dH1gKTtcbiAgaW5mby5jbGFzc0xpc3QuYWRkKFwiaW5mby10ZXh0XCIpO1xuXG4gIHJldHVybiBpbmZvO1xufTtcblxuY29uc3QgY3JlYXRlRm9yZWNhc3RDZWxsID0gKHBhcmVudCwgaW1nU3JjLCBkYXlUZXh0LCBoaWdoVGV4dCwgbG93VGV4dCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgcGFyZW50LFxuICAgIFwiZm9yZWNhc3QtY2VsbC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBkYXkgPSBjcmVhdGVUZXh0RWxlbWVudChcImg0XCIsIGNvbnRhaW5lciwgZGF5VGV4dCk7XG4gIGRheS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3QtZGF5XCIpO1xuICBjb25zdCB0ZW1wZXJhdHVyZUhpZ2ggPSBjcmVhdGVUZXh0RWxlbWVudChcImgyXCIsIGNvbnRhaW5lciwgYCR7aGlnaFRleHR9IMKwRmApO1xuICB0ZW1wZXJhdHVyZUhpZ2guY2xhc3NMaXN0LmFkZChcInRlbXAtaGlnaFwiKTtcbiAgY29uc3QgdGVtcGVyYXR1cmVMb3cgPSBjcmVhdGVUZXh0RWxlbWVudChcImg2XCIsIGNvbnRhaW5lciwgYCR7bG93VGV4dH0gwrBGYCk7XG4gIHRlbXBlcmF0dXJlTG93LmNsYXNzTGlzdC5hZGQoXCJ0ZW1wLWxvd1wiKTtcblxuICBjb25zdCBmb3JlY2FzdEltYWdlID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImltZ1wiLFxuICAgIGNvbnRhaW5lcixcbiAgICBcImZvcmVjYXN0LWltZ1wiXG4gICk7XG4gIGZvcmVjYXN0SW1hZ2Uuc3JjID0gaW1nU3JjO1xufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlVGV4dEVsZW1lbnQsXG4gIGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MsXG4gIGNyZWF0ZVdlYXRoZXJDZWxsLFxuICBjcmVhdGVGb3JlY2FzdENlbGwsXG59O1xuIiwiaW1wb3J0IHtcbiAgdXBkYXRlQ2VsbFZhbHVlcyxcbiAgdXBkYXRlRm9yZWNhc3RWYWx1ZXMsXG4gIHVwZGF0ZU5hdlZhbHVlcyxcbiAgdXBkYXRlRm9yZWNhc3REYXksXG59IGZyb20gXCIuL2hvbWVcIjtcblxuY29uc3Qga2V5ID0gXCIxNzBmZWUzNjYyZjk0ZWMzZDZiMzY0MzRmZTNkNGMwMFwiO1xubGV0IHVuaXRzID0gJ2ltcGVyaWFsJztcbmxldCBzZWxlY3RlZENpdHkgPSAnU2VhdHRsZSc7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3REYXRhKGNpdHkpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPSR7a2V5fSZ1bml0cz0ke3VuaXRzfWBcbiAgKTtcbiAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc3QgeyB2aXNpYmlsaXR5LCB0aW1lem9uZSwgbWFpbiwgd2VhdGhlciwgbmFtZSwgd2luZCwgZHQgfSA9IGpzb247XG5cbiAgY29uc3QgZGF5ID0gbmV3IERhdGUoZHQgKiAxMDAwICsgdGltZXpvbmUgKiAxMDAwKS5nZXREYXkoKTtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGR0ICogMTAwMCArIHRpbWV6b25lICogMTAwMCkudG9VVENTdHJpbmcoKS5zbGljZSgwLCAyMik7XG5cbiAgdXBkYXRlTmF2VmFsdWVzKHdlYXRoZXJbMF0uZGVzY3JpcHRpb24sIG5hbWUsIGRhdGUsIE1hdGgucm91bmQobWFpbi50ZW1wKSk7XG4gIGNvbnN0IHN1bnNldCA9IG5ldyBEYXRlKGpzb24uc3lzLnN1bnNldCAqIDEwMDAgKyB0aW1lem9uZSAqIDEwMDApXG4gICAgLnRvVVRDU3RyaW5nKClcbiAgICAuc2xpY2UoLTEyLCAtNyk7XG5cbiAgY29uc3Qgc3VucmlzZSA9IG5ldyBEYXRlKGpzb24uc3lzLnN1bnJpc2UgKiAxMDAwICsgdGltZXpvbmUgKiAxMDAwKVxuICAgIC50b1VUQ1N0cmluZygpXG4gICAgLnNsaWNlKC0xMiwgLTcpO1xuXG4gIHVwZGF0ZUNlbGxWYWx1ZXMoXG4gICAgc3VucmlzZSxcbiAgICBzdW5zZXQsXG4gICAgbWFpbi5wcmVzc3VyZSxcbiAgICB3aW5kLmRlZyxcbiAgICBNYXRoLnJvdW5kKG1haW4uZmVlbHNfbGlrZSksXG4gICAgbWFpbi5odW1pZGl0eSxcbiAgICB2aXNpYmlsaXR5LFxuICAgIE1hdGgucm91bmQod2luZC5zcGVlZClcbiAgKTtcblxuICB1cGRhdGVGb3JlY2FzdERheShbXG4gICAgZGF5ICsgMSxcbiAgICBkYXkgKyAyLFxuICAgIGRheSArIDMsXG4gICAgZGF5ICsgNCxcbiAgICBkYXkgKyA1LFxuICBdKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEZvcmVjYXN0KGNpdHkpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSZhcHBpZD0ke2tleX0mdW5pdHM9JHt1bml0c31gXG4gICAgKTtcbiAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc3Qge1xuICAgIGxpc3RcbiAgfSA9IGpzb247XG5cbiAgY29uc3QgaGlnaHMgPSBbXG4gICAgTWF0aC5yb3VuZChsaXN0WzFdLm1haW4udGVtcF9tYXgpLFxuICAgIE1hdGgucm91bmQobGlzdFs5XS5tYWluLnRlbXBfbWF4KSxcbiAgICBNYXRoLnJvdW5kKGxpc3RbMTVdLm1haW4udGVtcF9tYXgpLFxuICAgIE1hdGgucm91bmQobGlzdFsyM10ubWFpbi50ZW1wX21heCksXG4gICAgTWF0aC5yb3VuZChsaXN0WzMxXS5tYWluLnRlbXBfbWF4KSxcbiAgXTtcbiAgY29uc3QgbG93cyA9IFtcbiAgICBNYXRoLnJvdW5kKGxpc3RbMV0ubWFpbi50ZW1wX21pbiksXG4gICAgTWF0aC5yb3VuZChsaXN0WzldLm1haW4udGVtcF9taW4pLFxuICAgIE1hdGgucm91bmQobGlzdFsxNV0ubWFpbi50ZW1wX21pbiksXG4gICAgTWF0aC5yb3VuZChsaXN0WzIzXS5tYWluLnRlbXBfbWluKSxcbiAgICBNYXRoLnJvdW5kKGxpc3RbMzFdLm1haW4udGVtcF9taW4pLFxuICBdO1xuXG4gIHVwZGF0ZUZvcmVjYXN0VmFsdWVzKGhpZ2hzLCBsb3dzKTtcbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgc2VsZWN0ZWRDaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYmFyXCIpLnZhbHVlO1xuICAgIHJlcXVlc3REYXRhKHNlbGVjdGVkQ2l0eSk7XG4gICAgcmVxdWVzdEZvcmVjYXN0KHNlbGVjdGVkQ2l0eSk7XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlLXVuaXRzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHVuaXRzID09PSAnaW1wZXJpYWwnKSB1bml0cyA9ICdtZXRyaWMnXG4gICAgZWxzZSBpZiAodW5pdHMgPT09ICdtZXRyaWMnKSB1bml0cyA9ICdpbXBlcmlhbCc7XG4gICAgcmVxdWVzdERhdGEoc2VsZWN0ZWRDaXR5KTtcbiAgICByZXF1ZXN0Rm9yZWNhc3Qoc2VsZWN0ZWRDaXR5KTtcbn0pXG5leHBvcnQgeyByZXF1ZXN0RGF0YSwgcmVxdWVzdEZvcmVjYXN0IH07XG4iLCJpbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LFxuICBjcmVhdGVUZXh0RWxlbWVudCxcbiAgY3JlYXRlRWxlbWVudFdpdGhDbGFzcyxcbiAgY3JlYXRlV2VhdGhlckNlbGwsXG4gIGNyZWF0ZUZvcmVjYXN0Q2VsbCxcbn0gZnJvbSBcIi4vVUlDb250cm9sbGVyLmpzXCI7XG5cbmxldCB1bml0cyA9ICdpbXBlcmlhbCc7XG5cbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG5jb25zdCB0b3BDb250ZW50ID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcImRpdlwiLCBjb250ZW50LCBcInRvcC1jb250ZW50XCIpO1xuXG5mdW5jdGlvbiBjcmVhdGVCYWNrZ3JvdW5kKCkge1xuICBjb250ZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKC4uL2Rpc3QvaW1hZ2VzL2xhbmRzY2FwZS5qcGcpXCI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5hdih3ZWF0aGVyRGVzY3JpcHRpb24sIGNpdHksIGRhdGUsIHRlbXBlcmF0dXJlKSB7XG4gIGNvbnN0IG5hdkNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICB0b3BDb250ZW50LFxuICAgIFwibmF2LWNvbnRhaW5lclwiXG4gICk7XG5cbiAgY29uc3Qgd2VhdGhlclRleHQgPSBjcmVhdGVUZXh0RWxlbWVudChcImgxXCIsIG5hdkNvbnRhaW5lciwgd2VhdGhlckRlc2NyaXB0aW9uKTtcbiAgd2VhdGhlclRleHQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3ZWF0aGVyLWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IGNpdHlUZXh0ID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoNFwiLCBuYXZDb250YWluZXIsIGNpdHkpO1xuICBjaXR5VGV4dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNpdHktZGVzY3JpcHRpb24tdGV4dFwiKTtcbiAgY29uc3QgZGF0ZVRleHQgPSBjcmVhdGVUZXh0RWxlbWVudChcInBcIiwgbmF2Q29udGFpbmVyLCBkYXRlKTtcbiAgZGF0ZVRleHQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkYXRlLWRlc2NyaXB0aW9uLXRleHRcIik7XG5cbiAgY29uc3QgdGVtcGVyYXR1cmVUZXh0ID0gY3JlYXRlVGV4dEVsZW1lbnQoXG4gICAgXCJoMVwiLFxuICAgIG5hdkNvbnRhaW5lcixcbiAgICBgJHt0ZW1wZXJhdHVyZX0gwrBGYFxuICApO1xuXG4gIHRlbXBlcmF0dXJlVGV4dC5jbGFzc0xpc3QuYWRkKFwidGVtcGVyYXR1cmUtdGV4dFwiKTtcbiAgY29uc3QgdG9nZ2xlVW5pdHMgPSBjcmVhdGVUZXh0RWxlbWVudCgnYnV0dG9uJywgbmF2Q29udGFpbmVyLCBcIkRpc3BsYXk6IMKwRlwiKTtcbiAgdG9nZ2xlVW5pdHMuc2V0QXR0cmlidXRlKCdpZCcsICd0b2dnbGUtdW5pdHMnKTtcbiAgdG9nZ2xlVW5pdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodW5pdHMgPT09ICdpbXBlcmlhbCcpIHtcbiAgICAgICAgdW5pdHMgPSAnbWV0cmljJztcbiAgICAgICAgICB0b2dnbGVVbml0cy5pbm5lclRleHQgPSBgRGlzcGxheTogwrBDYDtcbiAgICAgICAgfVxuICAgICAgZWxzZSBpZiAodW5pdHMgPT09ICdtZXRyaWMnKSB7XG4gICAgICAgIHVuaXRzID0gJ2ltcGVyaWFsJztcbiAgICAgICAgdG9nZ2xlVW5pdHMuaW5uZXJUZXh0ID0gYERpc3BsYXk6IMKwRmA7XG4gICAgICB9IFxuICB9KVxuXG5cbiAgY29uc3Qgd2VhdGhlciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXCJpbWdcIiwgbmF2Q29udGFpbmVyLCBcIndlYXRoZXItaW1nXCIpO1xuICB3ZWF0aGVyLnNyYyA9IFwiLi4vZGlzdC9pbWFnZXMvY2xvdWR5LnN2Z1wiO1xuXG4gIGNvbnN0IHNlYXJjaENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBuYXZDb250YWluZXIsXG4gICAgXCJzZWFyY2gtY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3Qgc2VhcmNoID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHNlYXJjaENvbnRhaW5lcik7XG4gIHNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNlYXJjaC1iYXJcIik7XG4gIHNlYXJjaC5wbGFjZWhvbGRlciA9IFwiU2VhcmNoXCI7XG5cbiAgY29uc3Qgc2VhcmNoQmFyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImltZ1wiLFxuICAgIHNlYXJjaENvbnRhaW5lcixcbiAgICBcInNlYXJjaC1pbWdcIlxuICApO1xuICBzZWFyY2hCYXIuc3JjID0gXCIuLi9kaXN0L2ltYWdlcy9zZWFyY2guc3ZnXCI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5hdlZhbHVlcyh3ZWF0aGVyRGVzY3JpcHRpb24sIGNpdHksIGRhdGUsIHRlbXBlcmF0dXJlKSB7XG4gIGNvbnN0IHdlYXRoZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IGNpdHlUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IGRhdGVUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IHRlbXB1cmF0dXJlVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wZXJhdHVyZS10ZXh0XCIpWzBdO1xuXG4gIHdlYXRoZXJUZXh0LmlubmVyVGV4dCA9IHdlYXRoZXJEZXNjcmlwdGlvbjtcbiAgY2l0eVRleHQuaW5uZXJUZXh0ID0gY2l0eTtcbiAgZGF0ZVRleHQuaW5uZXJUZXh0ID0gZGF0ZTtcbiAgaWYgKHVuaXRzID09PSAnaW1wZXJpYWwnKSB0ZW1wdXJhdHVyZVRleHQuaW5uZXJUZXh0ID0gYCR7dGVtcGVyYXR1cmV9IMKwRmA7XG4gIGVsc2UgaWYgKHVuaXRzID09PSAnbWV0cmljJykgdGVtcHVyYXR1cmVUZXh0LmlubmVyVGV4dCA9IGAke3RlbXBlcmF0dXJlfSDCsENgO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVXZWF0aGVyQ2VsbEdyaWQoXG4gIHN1bnJpc2UsXG4gIHN1bnNldCxcbiAgcHJlc3N1cmUsXG4gIHdpbmREaXJlY3Rpb24sXG4gIHRlbXAsXG4gIGh1bWlkaXR5LFxuICB2aXNpYmlsaXR5LFxuICB3aW5kXG4pIHtcbiAgY29uc3QgY2VsbENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICB0b3BDb250ZW50LFxuICAgIFwiY2VsbC1jb250YWluZXJcIlxuICApO1xuXG4gIGNvbnN0IGxlZnRDZWxsQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNlbGxDb250YWluZXIsXG4gICAgXCJsZWZ0LWNlbGwtY29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCByaWdodENlbGxjb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgY2VsbENvbnRhaW5lcixcbiAgICBcInJpZ2h0LWNlbGwtY29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCBzdW5yaXNlQ2VsbCA9IGNyZWF0ZVdlYXRoZXJDZWxsKFxuICAgIGxlZnRDZWxsQ29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvc3VucmlzZS5zdmdcIixcbiAgICBcIlN1bnJpc2VcIixcbiAgICBzdW5yaXNlXG4gICk7XG4gIHN1bnJpc2VDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3VucmlzZS1jZWxsXCIpO1xuXG4gIGNvbnN0IHN1bnNldENlbGwgPSBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICBsZWZ0Q2VsbENvbnRhaW5lcixcbiAgICBcIi4uL2Rpc3QvaW1hZ2VzL3N1bnNldC5zdmdcIixcbiAgICBcIlN1bnNldFwiLFxuICAgIHN1bnNldFxuICApO1xuICBzdW5zZXRDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic3Vuc2V0LWNlbGxcIik7XG5cbiAgY29uc3QgcHJlc3N1cmVDZWxsID0gY3JlYXRlV2VhdGhlckNlbGwoXG4gICAgbGVmdENlbGxDb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy90YXJnZXQuc3ZnXCIsXG4gICAgXCJQcmVzc3VyZVwiLFxuICAgIHByZXNzdXJlXG4gICk7XG4gIHByZXNzdXJlQ2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByZXNzdXJlLWNlbGxcIik7XG5cbiAgY29uc3Qgd2luZERpcmVjdGlvbkNlbGwgPSBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICBsZWZ0Q2VsbENvbnRhaW5lcixcbiAgICBcIi4uL2Rpc3QvaW1hZ2VzL3dpbmQuc3ZnXCIsXG4gICAgXCJXaW5kIERpcmVjdGlvblwiLFxuICAgIHdpbmREaXJlY3Rpb25cbiAgKTtcbiAgd2luZERpcmVjdGlvbkNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3aW5kLWRpcmVjdGlvbi1jZWxsXCIpO1xuXG4gIGNvbnN0IGZlZWxzTGlrZUNlbGwgPSBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICByaWdodENlbGxjb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy90aGVybW9tZXRlci5zdmdcIixcbiAgICBcIkZlZWxzIExpa2VcIixcbiAgICBgJHt0ZW1wfSDCsEZgXG4gICk7XG4gIGZlZWxzTGlrZUNlbGwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJmZWVscy1saWtlLWNlbGxcIik7XG5cbiAgY29uc3QgaHVtaWRpdHlDZWxsID0gY3JlYXRlV2VhdGhlckNlbGwoXG4gICAgcmlnaHRDZWxsY29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvZHJvcGxldC5zdmdcIixcbiAgICBcIkh1bWlkaXR5XCIsXG4gICAgaHVtaWRpdHlcbiAgKTtcbiAgaHVtaWRpdHlDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiaHVtaWRpdHktY2VsbFwiKTtcblxuICBjb25zdCB2aXNpYmlsaXR5Q2VsbCA9IGNyZWF0ZVdlYXRoZXJDZWxsKFxuICAgIHJpZ2h0Q2VsbGNvbnRhaW5lcixcbiAgICBcIi4uL2Rpc3QvaW1hZ2VzL2V5ZS5zdmdcIixcbiAgICBcIlZpc2liaWxpdHlcIixcbiAgICB2aXNpYmlsaXR5XG4gICk7XG4gIHZpc2liaWxpdHlDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidmlzaWJpbGl0eS1jZWxsXCIpO1xuXG4gIGNvbnN0IHdpbmRDZWxsID0gY3JlYXRlV2VhdGhlckNlbGwoXG4gICAgcmlnaHRDZWxsY29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvd2luZC5zdmdcIixcbiAgICBcIldpbmQgU3BlZWRcIixcbiAgICB3aW5kXG4gICk7XG4gIHdpbmRDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwid2luZC1jZWxsXCIpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDZWxsVmFsdWVzKFxuICBzdW5yaXNlLFxuICBzdW5zZXQsXG4gIHByZXNzdXJlLFxuICB3aW5kRGlyZWN0aW9uLFxuICB0ZW1wLFxuICBodW1pZGl0eSxcbiAgdmlzaWJpbGl0eSxcbiAgd2luZFxuKSB7XG4gIGNvbnN0IHN1bnJpc2VDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5yaXNlLWNlbGxcIik7XG4gIHN1bnJpc2VDZWxsLmlubmVyVGV4dCA9IGAke3N1bnJpc2V9YDtcbiAgY29uc3Qgc3Vuc2V0Q2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Vuc2V0LWNlbGxcIik7XG4gIHN1bnNldENlbGwuaW5uZXJUZXh0ID0gYCR7c3Vuc2V0fWA7XG4gIGNvbnN0IHByZXNzdXJlQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlc3N1cmUtY2VsbFwiKTtcbiAgcHJlc3N1cmVDZWxsLmlubmVyVGV4dCA9IGAke3ByZXNzdXJlfW1iYDtcbiAgY29uc3Qgd2luZERpcmVjdGlvbkNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmQtZGlyZWN0aW9uLWNlbGxcIik7XG4gIHdpbmREaXJlY3Rpb25DZWxsLmlubmVyVGV4dCA9IGAke3dpbmREaXJlY3Rpb259wrBgO1xuICBjb25zdCBmZWVsc0xpa2VDZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZWVscy1saWtlLWNlbGxcIik7XG4gIGlmICh1bml0cyA9PT0gJ2ltcGVyaWFsJykgZmVlbHNMaWtlQ2VsbC5pbm5lclRleHQgPSBgJHt0ZW1wfSDCsEZgO1xuICBlbHNlIGlmICh1bml0cyA9PT0gJ21ldHJpYycpIGZlZWxzTGlrZUNlbGwuaW5uZXJUZXh0ID0gYCR7dGVtcH0gwrBDYDtcblxuICBjb25zdCBodW1pZGl0eUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5LWNlbGxcIik7XG4gIGh1bWlkaXR5Q2VsbC5pbm5lclRleHQgPSBgJHtodW1pZGl0eX0lYDtcbiAgY29uc3QgdmlzaWJpbGl0eUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2liaWxpdHktY2VsbFwiKTtcbiAgdmlzaWJpbGl0eUNlbGwuaW5uZXJUZXh0ID0gYCR7dmlzaWJpbGl0eX1tYDtcbiAgY29uc3Qgd2luZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmQtY2VsbFwiKTtcbiAgaWYgKHVuaXRzID09PSAnaW1wZXJpYWwnKSB3aW5kQ2VsbC5pbm5lclRleHQgPSBgJHt3aW5kfW1waGA7XG4gIGVsc2UgaWYgKHVuaXRzID09PSAnbWV0cmljJykgd2luZENlbGwuaW5uZXJUZXh0ID0gYCR7d2luZH0gbS9zYDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3QoaGlnaHMsIGxvd3MpIHtcbiAgY29uc3QgdG9nZ2xlQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRlbnQsXG4gICAgXCJ0b2dnbGUtY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3QgdG9nZ2xlRm9yZWNhc3REYWlseSA9IGNyZWF0ZVRleHRFbGVtZW50KFxuICAgIFwiYnV0dG9uXCIsXG4gICAgdG9nZ2xlQ29udGFpbmVyLFxuICAgIFwiRGFpbHkgRm9yZWNhc3RcIlxuICApO1xuXG4gIGNvbnN0IGZvcmVjYXN0Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRlbnQsXG4gICAgXCJmb3JlY2FzdC1jb250YWluZXJcIlxuICApO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoXG4gICAgZm9yZWNhc3RDb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy9jbG91ZHkuc3ZnXCIsXG4gICAgXCJTdW5kYXlcIixcbiAgICBoaWdoc1swXSxcbiAgICBsb3dzWzBdXG4gICk7XG4gIGNyZWF0ZUZvcmVjYXN0Q2VsbChcbiAgICBmb3JlY2FzdENvbnRhaW5lcixcbiAgICBcIi4uL2Rpc3QvaW1hZ2VzL2Nsb3VkeS5zdmdcIixcbiAgICBcIk1vbmRheVwiLFxuICAgIGhpZ2hzWzFdLFxuICAgIGxvd3NbMV1cbiAgKTtcbiAgY3JlYXRlRm9yZWNhc3RDZWxsKFxuICAgIGZvcmVjYXN0Q29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvY2xvdWR5LnN2Z1wiLFxuICAgIFwiVHVlc2RheVwiLFxuICAgIGhpZ2hzWzJdLFxuICAgIGxvd3NbMl1cbiAgKTtcbiAgY3JlYXRlRm9yZWNhc3RDZWxsKFxuICAgIGZvcmVjYXN0Q29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvY2xvdWR5LnN2Z1wiLFxuICAgIFwiV2VkbmVzZGF5XCIsXG4gICAgaGlnaHNbM10sXG4gICAgbG93c1szXVxuICApO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoXG4gICAgZm9yZWNhc3RDb250YWluZXIsXG4gICAgXCIuLi9kaXN0L2ltYWdlcy9jbG91ZHkuc3ZnXCIsXG4gICAgXCJUaHVyc2RheVwiLFxuICAgIGhpZ2hzWzRdLFxuICAgIGxvd3NbNF1cbiAgKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRm9yZWNhc3RWYWx1ZXMoaGlnaHMsIGxvd3MpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGVtcC1oaWdoXCIpLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHVuaXRzID09PSAnaW1wZXJpYWwnKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wLWhpZ2hcIilbaV0uaW5uZXJUZXh0ID0gYCR7aGlnaHNbaV19IMKwRmA7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wLWxvd1wiKVtpXS5pbm5lclRleHQgPSBgJHtsb3dzW2ldfSDCsEZgO1xuICAgIH1cbiAgICBlbHNlIGlmICh1bml0cyA9PT0gJ21ldHJpYycpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRlbXAtaGlnaFwiKVtpXS5pbm5lclRleHQgPSBgJHtoaWdoc1tpXX0gwrBDYDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRlbXAtbG93XCIpW2ldLmlubmVyVGV4dCA9IGAke2xvd3NbaV19IMKwQ2A7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZvcmVjYXN0RGF5KGRheSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0ZW1wLWhpZ2hcIikubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZGF5W2ldICUgNyA9PT0gMCkgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcmVjYXN0LWRheVwiKVtpXS5pbm5lclRleHQgPSBgU3VuZGF5YDtcbiAgICBlbHNlIGlmIChkYXlbaV0gJSA3ID09PSAxKSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9yZWNhc3QtZGF5XCIpW2ldLmlubmVyVGV4dCA9IGBNb25kYXlgO1xuICAgIGVsc2UgaWYgKGRheVtpXSAlIDcgPT09IDIpIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmb3JlY2FzdC1kYXlcIilbaV0uaW5uZXJUZXh0ID0gYFR1ZXNkYXlgO1xuICAgIGVsc2UgaWYgKGRheVtpXSAlIDcgPT09IDMpIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmb3JlY2FzdC1kYXlcIilbaV0uaW5uZXJUZXh0ID0gYFdlZG5lc2RheWA7XG4gICAgZWxzZSBpZiAoZGF5W2ldICUgNyA9PT0gNCkgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcmVjYXN0LWRheVwiKVtpXS5pbm5lclRleHQgPSBgVGh1cnNkYXlgO1xuICAgIGVsc2UgaWYgKGRheVtpXSAlIDcgPT09IDUpIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmb3JlY2FzdC1kYXlcIilbaV0uaW5uZXJUZXh0ID0gYEZyaWRheWA7XG4gICAgZWxzZSBpZiAoZGF5W2ldICUgNyA9PT0gNikgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcmVjYXN0LWRheVwiKVtpXS5pbm5lclRleHQgPSBgU2F0dXJkYXlgO1xuICB9XG59XG5cbmNyZWF0ZU5hdihcIkNsb3VkeVwiLCBcIlNlYXR0bGVcIiwgXCJNb25kYXksIDI3dGggTm92IDIwMjMgODoyNyBwbVwiLCBcIjQ3XCIpO1xuY3JlYXRlV2VhdGhlckNlbGxHcmlkKFxuICBcIjc6MzBcIixcbiAgXCI4OjAwXCIsXG4gIFwiMTA0MFwiLFxuICBcIjEwMMKwXCIsXG4gIDE3LFxuICBcIjU4JVwiLFxuICBcIjEwMDAwbVwiLFxuICBcIjE0IG1waFwiXG4pO1xuY3JlYXRlRm9yZWNhc3QoXG4gIFs0MywgNDQsIDQ1LCA0NiwgNDcsIDQyLCAzOV0sXG4gIFszOSwgNDAsIDQyLCA0MiwgNDIsIDM5LCAzNF0sXG4pO1xuXG5leHBvcnQge1xuICBjcmVhdGVCYWNrZ3JvdW5kLFxuICB1cGRhdGVOYXZWYWx1ZXMsXG4gIHVwZGF0ZUNlbGxWYWx1ZXMsXG4gIHVwZGF0ZUZvcmVjYXN0VmFsdWVzLFxuICB1cGRhdGVGb3JlY2FzdERheSxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlcXVlc3REYXRhLCByZXF1ZXN0Rm9yZWNhc3QgfSBmcm9tIFwiLi9hcGlDb250cm9sbGVyLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVCYWNrZ3JvdW5kIH0gZnJvbSBcIi4vaG9tZS5qc1wiO1xuY3JlYXRlQmFja2dyb3VuZCgpO1xucmVxdWVzdERhdGEoXCJTZWF0dGxlXCIpO1xucmVxdWVzdEZvcmVjYXN0KFwiU2VhdHRsZVwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==