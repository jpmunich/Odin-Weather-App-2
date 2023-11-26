const key = "170fee3662f94ec3d6b36434fe3d4c00";
const lat = -47.6061;
const lon = 122.3328;

function createBackground() {
  document.getElementById("content").style.backgroundImage =
    "url(../dist/images/landscape.jpg)";
}

function requestData() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=${key}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then((response) => console.log(response));
}

export { createBackground, requestData };
