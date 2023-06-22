import {
  renderWidgetForecast,
  renderWidgetOther,
  renderWidgetToday
} from "./render.js"
import { dataWeather } from "./utils.js";

export const startWidget = async () => {
  const widget = document.createElement('div');

  widget.classList.add('widget');

  if (dataWeather.success) {
    renderWidgetToday(widget);
    renderWidgetOther(widget);
  } else {
    showError();
  }
  renderWidgetForecast(widget);

  return widget
}