import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday
} from "./render.js"
import { dataWeather, dataForecast } from "./utils.js";

export const startWidget = async (widget) => {
  // console.log(city)

  if (!widget) {
    widget = document.createElement('div');

    widget.classList.add('widget');
  }


  if (dataWeather.success) {
    renderWidgetToday(widget);
    renderWidgetOther(widget);
  } else {
    showError();
  }

  if (dataForecast.success) {
    renderWidgetForecast(widget);
  } else {
    showError();
  }

  return widget
}