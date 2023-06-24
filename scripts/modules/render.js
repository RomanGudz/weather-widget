import { dataForecast, getCurrentDateTime, getWeatherForecastData, weatherToday } from "./utils.js"

export const renderWidgetToday = (widget) => {
  const { year, dayOfMouth, mouth, dayOfWeek, hours, minutes } = getCurrentDateTime();
  const { icon, sity, temp, tempFeels } = weatherToday();


  widget.insertAdjacentHTML(
    'beforeend',
    `
    <div class="widget__today">
      <div class="widget__date-block">
        <p class="widget__date">${mouth} ${dayOfMouth} ${year}</p>
        <p class="widget__time">${hours}:${minutes}</p>
        <p class="widget__day">${dayOfWeek}</p>
      </div>
      <div class="widget__icon">
        <img class="widget__img" src="./icon/${icon}.svg" alt="Погода">
      </div>
      <div class="widget__wheather">
        <div class="widget__city">
          <p>${sity}</p>
          <button class="widget__change-city" aria-label="Изменить город" ></button>
        </div >
        <p class="widget__temp-big">${temp.toFixed(1)}°C</p>
        <p class="widget__felt">ощущается</p>
        <p class="widget__temp-small">${tempFeels.toFixed(1)} °C</p>
      </div >
    </div >
  `
  )
}
export const renderWidgetOther = (widget) => {
  const { windSpeed, humidity, pressure, windDeg, devPoint } = weatherToday();

  widget.insertAdjacentHTML(
    'beforeend',
    `
  <div class="widget__other" >
        <div class="widget__wind">
          <p class="widget__wind-title">Ветер</p>
          <p class="widget__wind-speed">${windSpeed} м/с</p>
          <p class="widget__wind-text">${windDeg}</p>
  
        </div>
        <div class="widget__humidity">
          <p class="widget__humidity-title">Влажность</p>
          <p class="widget__humidity-value">${humidity}%</p>
          <p class="widget__humidity-text">Т.Р: ${devPoint} °C</p>
        </div>
        <div class="widget__pressure">
          <p class="widget__pressure-title">Давление</p>
          <p class="widget__pressure-value">${pressure}</p>
          <p class="widget__pressure-text">мм рт.ст.</p>
        </div>
      </div >
  `
  )
}
export const renderWidgetForecast = (widget) => {
  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast';
  widget.append(widgetForecast);

  const forecastData = getWeatherForecastData()
  const items = forecastData.map((item) => {
    const widgetDayItem = document.createElement('li');
    widgetDayItem.className = 'widget__day-item';

    widgetDayItem.insertAdjacentHTML('beforeend',
      `
  <p class="widget__day-text" > ${item.dayOfWeek}</p >
    <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода">
      <p class="widget__day-temp">${(item.minTemp - 273.15).toFixed(1)}°/${(item.maxTemp - 273.15).toFixed(1)}°</p>
      `
    );
    return widgetDayItem
  });

  widgetForecast.append(...items)
  console.log(dataForecast)
}

export const showError = (widget, error) => {
  widget.textContent = error.toString()
  widget.classList.add('widget_error')
} 