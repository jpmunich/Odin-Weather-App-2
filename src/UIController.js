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

export {
  createElement,
  createTextElement,
  createElementWithClass,
  createWeatherCell,
  createForecastCell,
};
