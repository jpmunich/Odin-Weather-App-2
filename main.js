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

const createWeatherCell = (parent) => {
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
  icon.src = "../dist/images/thermometer.svg";

  const infoType = createTextElement("h6", textContainer, "Feels Like");
  const info = createTextElement("h3", textContainer, "17 °F");
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

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBackground: () => (/* binding */ createBackground),
/* harmony export */   createNav: () => (/* binding */ createNav)
/* harmony export */ });
/* harmony import */ var _UIController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIController.js */ "./src/UIController.js");


const content = document.getElementById("content");
const topContent = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)("div", content, "top-content");

function createBackground() {
  document.getElementById("content").style.backgroundImage =
    "url(../dist/images/landscape.jpg)";
}

function createNav(weatherDescription, city, date, temperature) {
  const navContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    topContent,
    "nav-container"
  );

  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("h1", navContainer, weatherDescription);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("h4", navContainer, city);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createTextElement)("p", navContainer, date);
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

function createWeatherCellGrid() {
  const cellContainer = (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createElementWithClass)(
    "div",
    topContent,
    "cell-container"
  );

  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(cellContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(cellContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(cellContainer);
  (0,_UIController_js__WEBPACK_IMPORTED_MODULE_0__.createWeatherCell)(cellContainer);
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
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ "./src/home.js");

(0,_home__WEBPACK_IMPORTED_MODULE_0__.createBackground)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RHlCOztBQUUzQjtBQUNBLG1CQUFtQix3RUFBc0I7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHdFQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLG1FQUFpQjtBQUNuQixFQUFFLG1FQUFpQjtBQUNuQixFQUFFLG1FQUFpQjtBQUNuQiwwQkFBMEIsbUVBQWlCO0FBQzNDO0FBQ0E7QUFDQSxPQUFPLGFBQWE7QUFDcEI7QUFDQTtBQUNBLEVBQUUsbUVBQWlCOztBQUVuQixrQkFBa0Isd0VBQXNCO0FBQ3hDOztBQUVBLDBCQUEwQix3RUFBc0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0RBQWE7QUFDOUI7QUFDQTs7QUFFQSxvQkFBb0Isd0VBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3Qix3RUFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSxtRUFBaUI7QUFDbkIsRUFBRSxtRUFBaUI7QUFDbkIsRUFBRSxtRUFBaUI7QUFDbkIsRUFBRSxtRUFBaUI7QUFDbkI7O0FBRUE7QUFDQSwwQkFBMEIsd0VBQXNCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1FQUFpQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtRUFBaUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0VBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxvRUFBa0I7QUFDcEIsRUFBRSxvRUFBa0I7QUFDcEIsRUFBRSxvRUFBa0I7QUFDcEIsRUFBRSxvRUFBa0I7QUFDcEIsRUFBRSxvRUFBa0I7QUFDcEIsRUFBRSxvRUFBa0I7QUFDcEIsRUFBRSxvRUFBa0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBOztBQUV1Qzs7Ozs7OztVQ3JHdkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04wQztBQUMxQyx1REFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvLi9zcmMvVUlDb250cm9sbGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAtMi8uL3NyYy9ob21lLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAtMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLTIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAtMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAtMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAtMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIHBhcmVudCkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRleHRFbGVtZW50ID0gKHR5cGUsIHBhcmVudCwgdGV4dCkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICBlbGVtZW50LmlubmVyVGV4dCA9IHRleHQ7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudFdpdGhDbGFzcyA9ICh0eXBlLCBwYXJlbnQsIGNsYXNzTmFtZSkgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5jb25zdCBjcmVhdGVXZWF0aGVyQ2VsbCA9IChwYXJlbnQpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHBhcmVudCxcbiAgICBcIndlYXRoZXItY2VsbC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBpY29uQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRhaW5lcixcbiAgICBcImljb24tY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3QgdGV4dENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250YWluZXIsXG4gICAgXCJ3ZWF0aGVyLXRleHQtY29udGFpbmVyXCJcbiAgKTtcblxuICBjb25zdCBpY29uID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcImltZ1wiLCBpY29uQ29udGFpbmVyLCBcIndlYXRoZXItY2VsbC1pbWdcIik7XG4gIGljb24uc3JjID0gXCIuLi9kaXN0L2ltYWdlcy90aGVybW9tZXRlci5zdmdcIjtcblxuICBjb25zdCBpbmZvVHlwZSA9IGNyZWF0ZVRleHRFbGVtZW50KFwiaDZcIiwgdGV4dENvbnRhaW5lciwgXCJGZWVscyBMaWtlXCIpO1xuICBjb25zdCBpbmZvID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoM1wiLCB0ZXh0Q29udGFpbmVyLCBcIjE3IMKwRlwiKTtcbn07XG5cbmNvbnN0IGNyZWF0ZUZvcmVjYXN0Q2VsbCA9IChwYXJlbnQpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHBhcmVudCxcbiAgICBcImZvcmVjYXN0LWNlbGwtY29udGFpbmVyXCJcbiAgKTtcbiAgY29uc3QgZGF5ID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoNFwiLCBjb250YWluZXIsIFwiTW9uZGF5XCIpO1xuICBjb25zdCB0ZW1wZXJhdHVyZUhpZ2ggPSBjcmVhdGVUZXh0RWxlbWVudChcImgyXCIsIGNvbnRhaW5lciwgXCI0MyDCsEZcIik7XG4gIGNvbnN0IHRlbXBlcmF0dXJlTG93ID0gY3JlYXRlVGV4dEVsZW1lbnQoXCJoNlwiLCBjb250YWluZXIsIFwiNDEgwrBGXCIpO1xuICBjb25zdCBmb3JlY2FzdEltYWdlID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImltZ1wiLFxuICAgIGNvbnRhaW5lcixcbiAgICBcImZvcmVjYXN0LWltZ1wiXG4gICk7XG4gIGZvcmVjYXN0SW1hZ2Uuc3JjID0gXCIuLi9kaXN0L2ltYWdlcy9jbG91ZHkuc3ZnXCI7XG59O1xuZXhwb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlVGV4dEVsZW1lbnQsXG4gIGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MsXG4gIGNyZWF0ZVdlYXRoZXJDZWxsLFxuICBjcmVhdGVGb3JlY2FzdENlbGwsXG59O1xuIiwiaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlVGV4dEVsZW1lbnQsXG4gIGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MsXG4gIGNyZWF0ZVdlYXRoZXJDZWxsLFxuICBjcmVhdGVGb3JlY2FzdENlbGwsXG59IGZyb20gXCIuL1VJQ29udHJvbGxlci5qc1wiO1xuXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuY29uc3QgdG9wQ29udGVudCA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXCJkaXZcIiwgY29udGVudCwgXCJ0b3AtY29udGVudFwiKTtcblxuZnVuY3Rpb24gY3JlYXRlQmFja2dyb3VuZCgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XG4gICAgXCJ1cmwoLi4vZGlzdC9pbWFnZXMvbGFuZHNjYXBlLmpwZylcIjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmF2KHdlYXRoZXJEZXNjcmlwdGlvbiwgY2l0eSwgZGF0ZSwgdGVtcGVyYXR1cmUpIHtcbiAgY29uc3QgbmF2Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIHRvcENvbnRlbnQsXG4gICAgXCJuYXYtY29udGFpbmVyXCJcbiAgKTtcblxuICBjcmVhdGVUZXh0RWxlbWVudChcImgxXCIsIG5hdkNvbnRhaW5lciwgd2VhdGhlckRlc2NyaXB0aW9uKTtcbiAgY3JlYXRlVGV4dEVsZW1lbnQoXCJoNFwiLCBuYXZDb250YWluZXIsIGNpdHkpO1xuICBjcmVhdGVUZXh0RWxlbWVudChcInBcIiwgbmF2Q29udGFpbmVyLCBkYXRlKTtcbiAgY29uc3QgdGVtcGVyYXR1cmVUZXh0ID0gY3JlYXRlVGV4dEVsZW1lbnQoXG4gICAgXCJoMVwiLFxuICAgIG5hdkNvbnRhaW5lcixcbiAgICBgJHt0ZW1wZXJhdHVyZX0gwrBGYFxuICApO1xuICB0ZW1wZXJhdHVyZVRleHQuY2xhc3NMaXN0LmFkZChcInRlbXBlcmF0dXJlLXRleHRcIik7XG4gIGNyZWF0ZVRleHRFbGVtZW50KFwicFwiLCBuYXZDb250YWluZXIsIFwiRGlzcGxheTogwrBGXCIpO1xuXG4gIGNvbnN0IHdlYXRoZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFwiaW1nXCIsIG5hdkNvbnRhaW5lciwgXCJ3ZWF0aGVyLWltZ1wiKTtcbiAgd2VhdGhlci5zcmMgPSBcIi4uL2Rpc3QvaW1hZ2VzL2Nsb3VkeS5zdmdcIjtcblxuICBjb25zdCBzZWFyY2hDb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgbmF2Q29udGFpbmVyLFxuICAgIFwic2VhcmNoLWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHNlYXJjaCA9IGNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBzZWFyY2hDb250YWluZXIpO1xuICBzZWFyY2guc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzZWFyY2gtYmFyXCIpO1xuICBzZWFyY2gucGxhY2Vob2xkZXIgPSBcIlNlYXJjaFwiO1xuXG4gIGNvbnN0IHNlYXJjaEJhciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJpbWdcIixcbiAgICBzZWFyY2hDb250YWluZXIsXG4gICAgXCJzZWFyY2gtaW1nXCJcbiAgKTtcbiAgc2VhcmNoQmFyLnNyYyA9IFwiLi4vZGlzdC9pbWFnZXMvc2VhcmNoLnN2Z1wiO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVXZWF0aGVyQ2VsbEdyaWQoKSB7XG4gIGNvbnN0IGNlbGxDb250YWluZXIgPSBjcmVhdGVFbGVtZW50V2l0aENsYXNzKFxuICAgIFwiZGl2XCIsXG4gICAgdG9wQ29udGVudCxcbiAgICBcImNlbGwtY29udGFpbmVyXCJcbiAgKTtcblxuICBjcmVhdGVXZWF0aGVyQ2VsbChjZWxsQ29udGFpbmVyKTtcbiAgY3JlYXRlV2VhdGhlckNlbGwoY2VsbENvbnRhaW5lcik7XG4gIGNyZWF0ZVdlYXRoZXJDZWxsKGNlbGxDb250YWluZXIpO1xuICBjcmVhdGVXZWF0aGVyQ2VsbChjZWxsQ29udGFpbmVyKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3QoKSB7XG4gIGNvbnN0IHRvZ2dsZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoXG4gICAgXCJkaXZcIixcbiAgICBjb250ZW50LFxuICAgIFwidG9nZ2xlLWNvbnRhaW5lclwiXG4gICk7XG4gIGNvbnN0IHRvZ2dsZUZvcmVjYXN0RGFpbHkgPSBjcmVhdGVUZXh0RWxlbWVudChcbiAgICBcImJ1dHRvblwiLFxuICAgIHRvZ2dsZUNvbnRhaW5lcixcbiAgICBcIkRhaWx5XCJcbiAgKTtcbiAgY29uc3QgdG9nZ2xlRm9yZWNhc3RIb3VybHkgPSBjcmVhdGVUZXh0RWxlbWVudChcbiAgICBcImJ1dHRvblwiLFxuICAgIHRvZ2dsZUNvbnRhaW5lcixcbiAgICBcImhvdXJseVwiXG4gICk7XG4gIGNvbnN0IGZvcmVjYXN0Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudFdpdGhDbGFzcyhcbiAgICBcImRpdlwiLFxuICAgIGNvbnRlbnQsXG4gICAgXCJmb3JlY2FzdC1jb250YWluZXJcIlxuICApO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xuICBjcmVhdGVGb3JlY2FzdENlbGwoZm9yZWNhc3RDb250YWluZXIpO1xufVxuXG5jcmVhdGVOYXYoXCJDbG91ZHlcIiwgXCJTZWF0dGxlXCIsIFwiTW9uZGF5LCAyN3RoIE5vdiAyMDIzIDg6MjcgcG1cIiwgXCI0N1wiKTtcbmNyZWF0ZVdlYXRoZXJDZWxsR3JpZCgpO1xuY3JlYXRlRm9yZWNhc3QoKTtcblxuZXhwb3J0IHsgY3JlYXRlQmFja2dyb3VuZCwgY3JlYXRlTmF2IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUJhY2tncm91bmQgfSBmcm9tIFwiLi9ob21lXCI7XG5jcmVhdGVCYWNrZ3JvdW5kKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=