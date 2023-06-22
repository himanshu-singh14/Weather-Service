const getCurrentTimeStamp = require("../utils/utils.js");

class Weather {
  constructor(city, temp, lastupdated = new Date()) {
    this.city = city;
    this.temp = temp;
    this.lastupdated = lastupdated;
  }
}

module.exports = Weather;
