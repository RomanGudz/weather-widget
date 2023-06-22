const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '8ba6a4cbb8b1a2157bab226917a67ff5';

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&lang=ru`);
    if (!response.ok) {
      throw new Error('Ошибка запроса')
    }
    const data = await response.json();
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }


}