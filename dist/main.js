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
};

const createForecastCell = (parent) => {
  const container = createElementWithClass(
    "div",
    parent,
    "forecast-cell-container"
  );
  const day = createTextElement("h4", container, "Monday");
  const temperatureHigh = createTextElement("h2", container, "43 °F");
  const temperatureLow = createTextElement("h6", container, "41 °F");
  const forecastImage = createElementWithClass(
    "img",
    container,
    "forecast-img"
  );
  forecastImage.src = "../dist/images/cloudy.svg";
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

async function requestData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`
  );
  const json = await response.json();
  const { timezone, visibility, main, weather, name } = json;

  console.log(main);
  console.log(weather[0].description);
  console.log(json);
  (0,_home__WEBPACK_IMPORTED_MODULE_0__.updateNavValues)(
    weather[0].description,
    name,
    "Monday, 27th Nov 2023 8:27 pm",
    main.temp
  );
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



/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBackground: () => (/* binding */ createBackground),
/* harmony export */   updateNavValues: () => (/* binding */ updateNavValues)
/* harmony export */ });
/* harmony import */ var _UIController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIController.js */ "./src/UIController.js");


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
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("p", navContainer, "Display: °F");

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
  tempuratureText.innerText = `${temperature} °F`;
}
function createWeatherCellGrid() {
  const cellContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    topContent,
    "cell-container"
  );

  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    cellContainer,
    "../dist/images/thermometer.svg",
    "Feels Like",
    "17 °F"
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    cellContainer,
    "../dist/images/droplet.svg",
    "Humidity",
    "69%"
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    cellContainer,
    "../dist/images/cloud-rain.svg",
    "Chance of Rain",
    "69%"
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(
    cellContainer,
    "../dist/images/wind.svg",
    "Wind Speed",
    "14.5 mph"
  );
}

function createForecast() {
  const toggleContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    content,
    "toggle-container"
  );
  const toggleForecastDaily = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)(
    "button",
    toggleContainer,
    "Daily"
  );
  const toggleForecastHourly = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)(
    "button",
    toggleContainer,
    "hourly"
  );
  const forecastContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    content,
    "forecast-container"
  );
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(forecastContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(forecastContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(forecastContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(forecastContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(forecastContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(forecastContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createForecastCell)(forecastContainer);
}

createNav("Cloudy", "Seattle", "Monday, 27th Nov 2023 8:27 pm", "47");
createWeatherCellGrid();
createForecast();




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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmlEO0FBQ0o7QUFDN0MsMERBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yLy4vc3JjL1VJQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvLi9zcmMvYXBpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvLi9zcmMvaG9tZS5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC0yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBjcmVhdGVUZXh0RWxlbWVudCA9ICh0eXBlLCBwYXJlbnQsIHRleHQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgZWxlbWVudC5pbm5lclRleHQgPSB0ZXh0O1xuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmNvbnN0IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MgPSAodHlwZSwgcGFyZW50LCBjbGFzc05hbWUpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuY29uc3QgY3JlYXRlV2VhdGhlckNlbGwgPSAocGFyZW50LCBpbWdTcmMsIGluZm9UeXBlVGV4dCwgaW5mb1RleHQpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHBhcmVudCxcbiAgICBcIndlYXRoZXItY2VsbC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBpY29uQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRhaW5lcixcbiAgICBcImljb24tY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3QgdGV4dENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250YWluZXIsXG4gICAgXCJ3ZWF0aGVyLXRleHQtY29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCBpY29uID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcImltZ1wiLCBpY29uQ29udGFpbmVyLCBcIndlYXRoZXItY2VsbC1pbWdcIik7XG4gIGljb24uc3JjID0gaW1nU3JjO1xuXG4gIGNvbnN0IGluZm9UeXBlID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoNlwiLCB0ZXh0Q29udGFpbmVyLCBpbmZvVHlwZVRleHQpO1xuICBpbmZvVHlwZS5jbGFzc0xpc3QuYWRkKFwiaW5mby10ZXh0XCIpO1xuICBjb25zdCBpbmZvID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoM1wiLCB0ZXh0Q29udGFpbmVyLCBgJHtpbmZvVGV4dH1gKTtcbiAgaW5mby5jbGFzc0xpc3QuYWRkKFwiaW5mby10ZXh0XCIpO1xufTtcblxuY29uc3QgY3JlYXRlRm9yZWNhc3RDZWxsID0gKHBhcmVudCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgcGFyZW50LFxuICAgIFwiZm9yZWNhc3QtY2VsbC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBkYXkgPSBjcmVhdGVUZXh0RWxlbWVudChcImg0XCIsIGNvbnRhaW5lciwgXCJNb25kYXlcIik7XG4gIGNvbnN0IHRlbXBlcmF0dXJlSGlnaCA9IGNyZWF0ZVRleHRFbGVtZW50KFwiaDJcIiwgY29udGFpbmVyLCBcIjQzIMKwRlwiKTtcbiAgY29uc3QgdGVtcGVyYXR1cmVMb3cgPSBjcmVhdGVUZXh0RWxlbWVudChcImg2XCIsIGNvbnRhaW5lciwgXCI0MSDCsEZcIik7XG4gIGNvbnN0IGZvcmVjYXN0SW1hZ2UgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiaW1nXCIsXG4gICAgY29udGFpbmVyLFxuICAgIFwiZm9yZWNhc3QtaW1nXCJcbiAgKTtcbiAgZm9yZWNhc3RJbWFnZS5zcmMgPSBcIi4uL2Rpc3QvaW1hZ2VzL2Nsb3VkeS5zdmdcIjtcbn07XG5leHBvcnQge1xuICBjcmVhdGVFbGVtZW50LFxuICBjcmVhdGVUZXh0RWxlbWVudCxcbiAgY3JlYXRlRWxlbWVudFdpdGhDbGFzcyxcbiAgY3JlYXRlV2VhdGhlckNlbGwsXG4gIGNyZWF0ZUZvcmVjYXN0Q2VsbCxcbn07XG4iLCJpbXBvcnQgeyB1cGRhdGVOYXZWYWx1ZXMgfSBmcm9tIFwiLi9ob21lXCI7XG5cbmNvbnN0IGtleSA9IFwiMTcwZmVlMzY2MmY5NGVjM2Q2YjM2NDM0ZmUzZDRjMDBcIjtcblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdERhdGEoY2l0eSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mYXBwaWQ9JHtrZXl9JnVuaXRzPWltcGVyaWFsYFxuICApO1xuICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICBjb25zdCB7IHRpbWV6b25lLCB2aXNpYmlsaXR5LCBtYWluLCB3ZWF0aGVyLCBuYW1lIH0gPSBqc29uO1xuXG4gIGNvbnNvbGUubG9nKG1haW4pO1xuICBjb25zb2xlLmxvZyh3ZWF0aGVyWzBdLmRlc2NyaXB0aW9uKTtcbiAgY29uc29sZS5sb2coanNvbik7XG4gIHVwZGF0ZU5hdlZhbHVlcyhcbiAgICB3ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgIG5hbWUsXG4gICAgXCJNb25kYXksIDI3dGggTm92IDIwMjMgODoyNyBwbVwiLFxuICAgIG1haW4udGVtcFxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0Rm9yZWNhc3QoY2l0eSkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHl9JmFwcGlkPSR7a2V5fSZ1bml0cz1pbXBlcmlhbGBcbiAgKTtcbiAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc3Qge1xuICAgIGNpdHk6IHsgc3Vuc2V0IH0sXG4gIH0gPSBqc29uO1xuICBjb25zb2xlLmxvZyhzdW5zZXQpO1xuICBjb25zdCBzdW5zZXRUaW1lID0gc3Vuc2V0ICogMTAwMDtcbiAgY29uc29sZS5sb2coc3Vuc2V0VGltZSk7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdW5zZXRUaW1lKS50b1VUQ1N0cmluZygpO1xuICBjb25zb2xlLmxvZyhkYXRlKTtcbiAgY29uc29sZS5sb2coanNvbik7XG59XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWJhclwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICByZXF1ZXN0RGF0YShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1iYXJcIikudmFsdWUpO1xuICB9XG59KTtcbmV4cG9ydCB7IHJlcXVlc3REYXRhLCByZXF1ZXN0Rm9yZWNhc3QgfTtcbiIsImltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNyZWF0ZVRleHRFbGVtZW50LFxuICBjcmVhdGVFbGVtZW50V2l0aENsYXNzLFxuICBjcmVhdGVXZWF0aGVyQ2VsbCxcbiAgY3JlYXRlRm9yZWNhc3RDZWxsLFxufSBmcm9tIFwiLi9VSUNvbnRyb2xsZXIuanNcIjtcblxuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcbmNvbnN0IHRvcENvbnRlbnQgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFwiZGl2XCIsIGNvbnRlbnQsIFwidG9wLWNvbnRlbnRcIik7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJhY2tncm91bmQoKSB7XG4gIGNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoLi4vZGlzdC9pbWFnZXMvbGFuZHNjYXBlLmpwZylcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmF2KHdlYXRoZXJEZXNjcmlwdGlvbiwgY2l0eSwgZGF0ZSwgdGVtcGVyYXR1cmUpIHtcbiAgY29uc3QgbmF2Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHRvcENvbnRlbnQsXG4gICAgXCJuYXYtY29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCB3ZWF0aGVyVGV4dCA9IGNyZWF0ZVRleHRFbGVtZW50KFwiaDFcIiwgbmF2Q29udGFpbmVyLCB3ZWF0aGVyRGVzY3JpcHRpb24pO1xuICB3ZWF0aGVyVGV4dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIndlYXRoZXItZGVzY3JpcHRpb24tdGV4dFwiKTtcbiAgY29uc3QgY2l0eVRleHQgPSBjcmVhdGVUZXh0RWxlbWVudChcImg0XCIsIG5hdkNvbnRhaW5lciwgY2l0eSk7XG4gIGNpdHlUZXh0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2l0eS1kZXNjcmlwdGlvbi10ZXh0XCIpO1xuICBjb25zdCBkYXRlVGV4dCA9IGNyZWF0ZVRleHRFbGVtZW50KFwicFwiLCBuYXZDb250YWluZXIsIGRhdGUpO1xuICBkYXRlVGV4dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRhdGUtZGVzY3JpcHRpb24tdGV4dFwiKTtcblxuICBjb25zdCB0ZW1wZXJhdHVyZVRleHQgPSBjcmVhdGVUZXh0RWxlbWVudChcbiAgICBcImgxXCIsXG4gICAgbmF2Q29udGFpbmVyLFxuICAgIGAke3RlbXBlcmF0dXJlfSDCsEZgXG4gICk7XG4gIHRlbXBlcmF0dXJlVGV4dC5jbGFzc0xpc3QuYWRkKFwidGVtcGVyYXR1cmUtdGV4dFwiKTtcbiAgY3JlYXRlVGV4dEVsZW1lbnQoXCJwXCIsIG5hdkNvbnRhaW5lciwgXCJEaXNwbGF5OiDCsEZcIik7XG5cbiAgY29uc3Qgd2VhdGhlciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXCJpbWdcIiwgbmF2Q29udGFpbmVyLCBcIndlYXRoZXItaW1nXCIpO1xuICB3ZWF0aGVyLnNyYyA9IFwiLi4vZGlzdC9pbWFnZXMvY2xvdWR5LnN2Z1wiO1xuXG4gIGNvbnN0IHNlYXJjaENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBuYXZDb250YWluZXIsXG4gICAgXCJzZWFyY2gtY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3Qgc2VhcmNoID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHNlYXJjaENvbnRhaW5lcik7XG4gIHNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNlYXJjaC1iYXJcIik7XG4gIHNlYXJjaC5wbGFjZWhvbGRlciA9IFwiU2VhcmNoXCI7XG5cbiAgY29uc3Qgc2VhcmNoQmFyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImltZ1wiLFxuICAgIHNlYXJjaENvbnRhaW5lcixcbiAgICBcInNlYXJjaC1pbWdcIlxuICApO1xuICBzZWFyY2hCYXIuc3JjID0gXCIuLi9kaXN0L2ltYWdlcy9zZWFyY2guc3ZnXCI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5hdlZhbHVlcyh3ZWF0aGVyRGVzY3JpcHRpb24sIGNpdHksIGRhdGUsIHRlbXBlcmF0dXJlKSB7XG4gIGNvbnN0IHdlYXRoZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IGNpdHlUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IGRhdGVUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLWRlc2NyaXB0aW9uLXRleHRcIik7XG4gIGNvbnN0IHRlbXB1cmF0dXJlVGV4dCA9XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRlbXBlcmF0dXJlLXRleHRcIilbMF07XG5cbiAgd2VhdGhlclRleHQuaW5uZXJUZXh0ID0gd2VhdGhlckRlc2NyaXB0aW9uO1xuICBjaXR5VGV4dC5pbm5lclRleHQgPSBjaXR5O1xuICBkYXRlVGV4dC5pbm5lclRleHQgPSBkYXRlO1xuICB0ZW1wdXJhdHVyZVRleHQuaW5uZXJUZXh0ID0gYCR7dGVtcGVyYXR1cmV9IMKwRmA7XG59XG5mdW5jdGlvbiBjcmVhdGVXZWF0aGVyQ2VsbEdyaWQoKSB7XG4gIGNvbnN0IGNlbGxDb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgdG9wQ29udGVudCxcbiAgICBcImNlbGwtY29udGFpbmVyXCJcbiAgKTtcblxuICBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICBjZWxsQ29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvdGhlcm1vbWV0ZXIuc3ZnXCIsXG4gICAgXCJGZWVscyBMaWtlXCIsXG4gICAgXCIxNyDCsEZcIlxuICApO1xuICBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICBjZWxsQ29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvZHJvcGxldC5zdmdcIixcbiAgICBcIkh1bWlkaXR5XCIsXG4gICAgXCI2OSVcIlxuICApO1xuICBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICBjZWxsQ29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvY2xvdWQtcmFpbi5zdmdcIixcbiAgICBcIkNoYW5jZSBvZiBSYWluXCIsXG4gICAgXCI2OSVcIlxuICApO1xuICBjcmVhdGVXZWF0aGVyQ2VsbChcbiAgICBjZWxsQ29udGFpbmVyLFxuICAgIFwiLi4vZGlzdC9pbWFnZXMvd2luZC5zdmdcIixcbiAgICBcIldpbmQgU3BlZWRcIixcbiAgICBcIjE0LjUgbXBoXCJcbiAgKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3QoKSB7XG4gIGNvbnN0IHRvZ2dsZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250ZW50LFxuICAgIFwidG9nZ2xlLWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHRvZ2dsZUZvcmVjYXN0RGFpbHkgPSBjcmVhdGVUZXh0RWxlbWVudChcbiAgICBcImJ1dHRvblwiLFxuICAgIHRvZ2dsZUNvbnRhaW5lcixcbiAgICBcIkRhaWx5XCJcbiAgKTtcbiAgY29uc3QgdG9nZ2xlRm9yZWNhc3RIb3VybHkgPSBjcmVhdGVUZXh0RWxlbWVudChcbiAgICBcImJ1dHRvblwiLFxuICAgIHRvZ2dsZUNvbnRhaW5lcixcbiAgICBcImhvdXJseVwiXG4gICk7XG4gIGNvbnN0IGZvcmVjYXN0Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRlbnQsXG4gICAgXCJmb3JlY2FzdC1jb250YWluZXJcIlxuICApO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xufVxuXG5jcmVhdGVOYXYoXCJDbG91ZHlcIiwgXCJTZWF0dGxlXCIsIFwiTW9uZGF5LCAyN3RoIE5vdiAyMDIzIDg6MjcgcG1cIiwgXCI0N1wiKTtcbmNyZWF0ZVdlYXRoZXJDZWxsR3JpZCgpO1xuY3JlYXRlRm9yZWNhc3QoKTtcblxuZXhwb3J0IHsgY3JlYXRlQmFja2dyb3VuZCwgdXBkYXRlTmF2VmFsdWVzIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSBcIi4vYXBpQ29udHJvbGxlci5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlQmFja2dyb3VuZCB9IGZyb20gXCIuL2hvbWUuanNcIjtcbmNyZWF0ZUJhY2tncm91bmQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==