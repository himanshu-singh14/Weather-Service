const User = require("../models/user.js");
const getCurrentTimeStamp = require("../utils/utils.js");
const UserDao = require("../dao/userdao.js");

const userDao = new UserDao();

class UserService {
  constructor() {
    this.users = [];
  }

  async registerUser(name, email, password) {
    if (name && email && password) {
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        throw new Error("User already exists with the provided email.");
      }
      const newUser = new User(name, email, password);
      //   this.users.push(newUser);
      userDao.insert(newUser);
    }
  }

  async getUserByEmail(email) {
    const user = await userDao.getUserByEmail(email);
    return user;
    // return this.users.find(user => user.email === email)
  }

  async showAllUser() {
    const data = await userDao.getAll();
    return data;
  }

  async loginUser(email, password) {
    if (!(email && password)) {
      throw new Error("Invalid input...");
    }

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("User does not exist...");
    }

    if (!(password === user.password)) {
      throw new Error("Password is wrong...");
    }

    user.isLoggedIn = true;

    userDao.update(user);
  }

  async logout(email) {
    if (!email) {
      throw new Error("Please enter Email...");
    }

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("User does not exist...");
    }

    user.isLoggedIn = false;

    userDao.update(user);
  }

  async delete(email) {
    if (!email) {
      throw new Error("Please enter Email...");
    }

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("User does not exist...");
    }

    userDao.delete(user);
  }
}

module.exports = UserService;
