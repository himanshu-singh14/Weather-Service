const database = require("../database/database.js");
const Weather = require("../models/weather.js");
// database.connect();

class WeatherDao {
  getCity(city) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM weather WHERE city = '${city}'`;

      database.query(query, (err, rows, fields) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows.length === 0) {
          resolve(null); // No city found with the given citys
        } else {
          const weather = new Weather(
            rows[0].city,
            rows[0].temp,
            rows[0].lastupdated
          );
          resolve(weather);
        }
      });
    });
  }

  insert(weather) {
    const query = `INSERT INTO weather (city, temp) VALUES ('${weather.city}', '${weather.temp}');`;

    database.query(query, (err, rows, fields) => {
      if (err) throw err;
      console.log("The solution is: ", rows);
    });
  }

  update(weather) {
    const query = `UPDATE weather SET temp = '${weather.temp}' WHERE city = '${weather.city}';`;

    database.query(query, (err, rows, fields) => {
      if (err) throw err;
      console.log("The solution is: ", rows);
    });
  }
}

module.exports = WeatherDao;
