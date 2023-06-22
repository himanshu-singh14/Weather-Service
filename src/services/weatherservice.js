const { response } = require("express");
const Weather = require("../models/weather.js");
const axios = require("axios");
const WeatherDao = require("../dao/weatherdao.js");
const getCurrentTimeStamp = require("../utils/utils.js");

const weatherDao = new WeatherDao();

class WeatherService {
  async getWeather(city) {
    const apiUrl = "http://api.weatherstack.com/current";
    const accessKey = "51e745bcef31ac2be413dc9a40dfc627";
    const location = city;

    const url = `${apiUrl}?access_key=${accessKey}&query=${location}`;

    const existingCity = await this.getCity(location);

    if (existingCity) {
      const date1 = new Date(existingCity.lastupdated);
      const date2 = new Date(); // Current date and time

      // Calculate the time difference in milliseconds
      const timeDifferenceMs = date2 - date1;

      if (timeDifferenceMs > 200000) {
        console.log("Updating data ...");

        const weather = await axios.get(url).then((response) => response.data);
        const newCity = new Weather(location, weather.current.temperature);
        weatherDao.update(newCity);
        return newCity;
      } else {
        console.log("Already Updated ...");

        return existingCity;
      }
    }

    const weather = await axios.get(url).then((response) => response.data);
    const newCity = new Weather(location, weather.current.temperature);
    weatherDao.insert(newCity);
    return newCity;
  }

  async getCity(location) {
    const city = await weatherDao.getCity(location);
    return city;
  }
}

module.exports = WeatherService;
