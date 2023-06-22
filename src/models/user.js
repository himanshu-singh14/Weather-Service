const getCurrentTimeStamp = require('../utils/utils.js')

class User {
  constructor(
    name,
    email,
    password,
    isLoggedIn = false,
    createdAt = null,
    updatedAt = null
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isLoggedIn = isLoggedIn;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User