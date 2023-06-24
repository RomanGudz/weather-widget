import { fetchForecast, fetchWeather } from "./APIservice.js";
import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
  showError
} from "./render.js"
import { dataForecast, dataWeather } from "./utils.js";

export const startWidget = async (widget) => {

  if (!widget) {
    widget = document.createElement('div');

    widget.classList.add('widget');
  };
  // if (city) {
  //   await fetchWeather(city);
  //   await fetchForecast(city);
  // }

  if (dataWeather.success) {
    renderWidgetToday(widget);
    renderWidgetOther(widget);
  } else {
    showError(dataWeather.error);
  }
  if (dataForecast.success) {
    renderWidgetForecast(widget);
  } else {
    showError(dataForecast.error);
  }
  return widget
}