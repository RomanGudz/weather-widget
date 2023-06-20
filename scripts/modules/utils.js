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
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  };

  if (minutes < 10) {
    minutes = `0${minutes}`;
  };

  return { year, dayOfMouth, mouth, dayOfWeek, hours, minutes };
};