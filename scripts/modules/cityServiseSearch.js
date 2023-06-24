import { startWidget } from "./widgetService.js";
import { fetchForecast, fetchWeather } from "./APIservice.js";

export const cityServiseSearch = (widget) => {
  const button = document.querySelector('.widget__change-city');

  button.addEventListener('click', () => {
    const form = document.createElement('form');
    form.classList.add('widget_form');

    const input = document.createElement('input');
    input.classList.add('widget_input');
    input.name = 'city';
    input.type = 'search';
    input.placeholder = 'введите название города';

    form.append(input);
    widget.append(form);
    input.focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      widget.textContent = '';
      await fetchWeather(input.value);
      await fetchForecast(input.value);
      await startWidget(widget);
      cityServiseSearch(widget);

    })
  })
}