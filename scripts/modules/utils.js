import { fetchForecast, fetchWeather } from "./APIservice.js";

export const dataWeather = await fetchWeather();
export const weatherToday = () => {
  const icon = dataWeather.data.weather[0].icon;
  const sity = dataWeather.data.name;
  const temp = tempToday(dataWeather.data.main.temp);
  const tempFeels = tempToday(dataWeather.data.main.feels_like);
  const windSpeed = dataWeather.data.wind.speed;
  const humidity = dataWeather.data.main.humidity;
  const devPoint = devPointMath(temp, humidity);
  const pressure = pressureToday(dataWeather.data.main.pressure);
  const windDeg = windDegToday(dataWeather.data.wind.deg)

  return { icon, sity, temp, tempFeels, windSpeed, humidity, devPoint, pressure, windDeg, dataWeather };
}
export const dataForecast = await fetchForecast();
export const getWeatherForecastData = () => {
  const forecast = dataForecast.data.list.filter((item) => {
    return new Date(item.dt_txt).getHours() === 12 &&
      new Date(item.dt_txt).getDate() > new Date().getDate()
  });
  const forecastData = forecast.map((item) => {
    const date = new Date(item.dt_txt);
    const weekdaysShort = [
      'вс',
      'пн',
      'вт',
      'ср',
      'чт',
      'пт',
      'сб',
    ];
    const dayOfWeek = weekdaysShort[date.getDay()];
    const weatherIcon = item.weather[0].icon;
    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < dataForecast.data.list.length; i++) {
      const temp = dataForecast.data.list[i].main.temp;
      const tempDate = new Date(dataForecast.data.list[i].dt_txt);

      if (tempDate.getDate() === date.getDate()) {
        if (temp < minTemp) {
          minTemp = temp;
        }

        if (temp > maxTemp) {
          maxTemp = temp;
        };
      };
    };
    return { dayOfWeek, weatherIcon, minTemp, maxTemp };
  });
  return forecastData;
};

export const getCurrentDateTime = () => {
  const mouths = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const weekdays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const date = new Date();

  const year = date.getFullYear();
  const dayOfMouth = date.getDate();
  const mouth = mouths[date.getMonth()];
  const dayOfWeek = weekdays[date.getDay()];
  let hours = validHoursMinutes(date.getHours());
  let minutes = validHoursMinutes(date.getMinutes());

  return { year, dayOfMouth, mouth, dayOfWeek, hours, minutes };
};

function validHoursMinutes(value) {
  return value < 10 ? `0${value}` : value
};

function tempToday(value) {
  return (value - 273.15)
};

function pressureToday(value) {
  return value * 0.75
};

function windDegToday(value) {
  if (value <= 0) {
    return value = '&#8595;'
  }
  else if (value <= 45) {
    return value = '&#8598;'
  }
  else if (value <= 90) {
    return value = '&#8592;'
  }
  else if (value <= 135) {
    return value = '&#8601;'
  }
  else if (value <= 180) {
    return value = '&#8593;'
  }
  else if (value <= 225) {
    return value = '&#8600;'
  }
  else if (value <= 270) {
    return value = '&#8594;'
  }
  else if (value <= 315) {
    return value = '&#8599;'
  }
  return value
};

function devPointMath(temp, humidity) {
  const a = 17.27;
  const b = 237.7;

  const ft = (a * temp) / (b + temp) + Math.log(humidity / 100);

  return ((b * ft) / (a - ft)).toFixed(1)
};