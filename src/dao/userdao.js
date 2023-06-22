const database = require("../database/database.js");
const User = require("../models/user.js");
database.connect();

class UserDao {
  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE email = '${email}'`;

      database.query(query, (err, rows, fields) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows.length === 0) {
          resolve(null); // No user found with the given email
        } else {
          const user = new User(
            rows[0].name,
            rows[0].email,
            rows[0].password,
            rows[0].isloggedin ? true : false,
            rows[0].createdAt,
            rows[0].updatedAt
          );
          resolve(user);
        }
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user`;

      database.query(query, (err, rows, fields) => {
        if (err) {
          reject(err);
          return;
        }
        const users = rows.map(
          (row) =>
            new User(
              row.name,
              row.email,
              row.password,
              row.isloggedin ? true : false,
              row.createdAt,
              row.updatedAt
            )
        );
        resolve(users);
      });
    });
  }

  insert(user) {
    const query = `INSERT INTO user (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`;

    database.query(query, (err, rows, fields) => {
      if (err) throw err;

      console.log("The solution is: ", rows);
    });
  }

  update(user) {
    const query = `UPDATE user SET isloggedin = '${
      user.isLoggedIn ? 1 : 0
    }' WHERE email = '${user.email}';`;

    database.query(query, (err, rows, fields) => {
      if (err) throw err;

      console.log("The solution is: ", rows);
    });
  }

  delete(user) {
    const query = `DELETE FROM user WHERE email = '${user.email}';`;

    database.query(query, (err, rows, fields) => {
      if (err) throw err;

      console.log("The solution is: ", rows);
    });
  }
}

module.exports = UserDao;
