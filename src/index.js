import { requestData, requestForecast } from "./apiController.js";
import { createBackground } from "./home.js";
createBackground();
requestData("Seattle");
requestForecast("Seattle");
