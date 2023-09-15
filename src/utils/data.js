export const getWeather = async function (city) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${city}&appid=${apiKey}&units=metric`;
    const f = await fetch(url);
    const data = await f.json();

    if (data.cod == 200) {
        const weatherData = {
            currentLocation: city,
            temp: Math.round(data.main.temp) + ' °C',
            feels_like: Math.round(data.main.feels_like) + ' °C',
            description: data.weather[0].description,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            imageURL: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        }

        return weatherData;
    }
    return false;
}