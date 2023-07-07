import { fetchForecast, fetchWeather } from "./APIservice.js";
import { updateForecastData, updateWeatherData } from "./utils.js";
import { startWidget } from "./widgetService.js";


export const cityServiseSearch = (widget) => {
  const button = document.querySelector('.widget__change-city');

  button.addEventListener('click', () => {
    const form = document.createElement('form');
    form.classList.add('widget__form');

    const input = document.createElement('input');
    input.classList.add('widget__input');
    input.name = 'city';
    input.type = 'search';
    input.placeholder = 'введите название города';

    form.append(input);
    widget.append(form);
    input.focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      widget.textContent = '';
      const weatherData = await fetchWeather(input.value);
      const forecastData = await fetchForecast(input.value);


      updateWeatherData(weatherData);
      updateForecastData(forecastData);

      await startWidget(widget);
      cityServiseSearch(widget);
    })
  })
}
