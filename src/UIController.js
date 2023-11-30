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

const createWeatherCell = () => {
  const container = createElementWithClass(
    "div",
    document.getElementById("content"),
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
  const info = createTextElement("h3", textContainer, "17°F");
};

createWeatherCell();

export { createElement, createTextElement, createElementWithClass };
