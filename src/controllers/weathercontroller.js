const express = require("express");
const router = express.Router();

const WeatherService = require("../services/weatherservice.js");
const weatherService = new WeatherService();

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  const weather = await weatherService.getWeather(city);
  res.send(weather);
});

module.exports = router;
