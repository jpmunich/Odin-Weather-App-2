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
export {
  createElement,
  createTextElement,
  createElementWithClass,
  createWeatherCell,
  createForecastCell,
};
