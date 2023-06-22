import { fetchWeather } from "./APIservice.js";

export const dataWeather = await fetchWeather('Белгород');
export const weatherToday = () => {
  const icon = dataWeather.data.weather[0].icon;
  const sity = dataWeather.data.name;
  const temp = tempToday(dataWeather.data.main.temp);
  const tempFeels = tempFeelsToday(dataWeather.data.main.feels_like);
  const windSpeed = dataWeather.data.wind.speed;
  const humidity = dataWeather.data.main.humidity;
  const devPoint = devPointMath(temp, humidity)
  const pressure = pressureToday(dataWeather.data.main.pressure);
  const windDeg = windDegToday(dataWeather.data.wind.deg)

  return { icon, sity, temp, tempFeels, windSpeed, humidity, devPoint, pressure, windDeg };
}



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
  return value = (value - 273.15).toFixed(1)
};

function tempFeelsToday(value) {
  return value = (value - 273.15).toFixed(1)
};

function pressureToday(value) {
  return value = value * 0.75
};

function windDegToday(value) {
  if (value <= 0) {
    return value = '&#8593;'
  }
  else if (value <= 45) {
    return value = '&#8599;'
  }
  else if (value <= 90) {
    return value = '&#8594;'
  }
  else if (value <= 135) {
    return value = '&#8600;'
  }
  else if (value <= 180) {
    return value = '&#8595;'
  }
  else if (value <= 225) {
    return value = '&#8601;'
  }
  else if (value <= 270) {
    return value = '&#8592;'
  }
  else if (value <= 315) {
    return value = '&#8598;'
  }
  return value
};

function devPointMath(temp, humidity) {
  return (temp - ((100 - humidity) / 5)).toFixed(1)
};