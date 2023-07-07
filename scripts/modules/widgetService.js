import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday,
  showError
} from "./render.js"
import { dataForecast, dataWeather, fetchData } from "./utils.js";

export const startWidget = async (widget) => {

  if (!widget) {
    await fetchData()
    widget = document.createElement('div');

    widget.classList.add('widget');
  };

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