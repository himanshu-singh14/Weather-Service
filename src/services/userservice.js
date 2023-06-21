const User = require('../models/user.js')
const getCurrentTimeStamp = require('../utils/utils.js')

class UserService {
    constructor(){
        this.users = []
    }

    registerUser(name, email, password) {
        if (name && email && password) {
          const existingUser = this.getUserByEmail(email);
          if (existingUser) {
            throw new Error("User already exists with the provided email.");
          }
          const newUser = new User(name, email, password);
          this.users.push(newUser);
        }
      }

    getUserByEmail(email) {
        return this.users.find(user => user.email === email)
    }

    showAllUser() {
        return this.users
    }

    loginUser(email, password){
        if (! (email && password)) {
            throw new Error("Invalid input...")
        }

        const result = this.users.filter(user => user.email === email)
    
        if (!result) {
            throw new Error("User does not exist...")
        }

        const user = result[0]

        if (! (password === user.password)) {
            throw new Error("Password is wrong...")
        }

        user.isLoggedIn = true; 
        // user.updatedAt = getCurrentTimeStamp();
        user.updatedAt = getCurrentTimeStamp().toISOString().slice(0, 19).replace('T', ' ');

        console.log(`${user.name} logging successful...`)
    }

    logout(email){
        if (! email) {
            throw new Error("Please enter Email...")
        }

        const result = this.users.filter(user => user.email === email)

        if (!result) {
            throw new Error("User does not exist...")
        }

        const user = result[0]

        user.isLoggedIn = false;
        user.updatedAt = getCurrentTimeStamp().toISOString().slice(0, 19).replace('T', ' ');

        console.log(`${user.name} logout successful...`)

    }
}

module.exports = UserService

// const userService = new UserService(); 

// const email = "himanshu@gmail.com"
// const name = "Himanshu"
// const password = "1235"

// const email1 = "virnedra@gmail.com"
// const name1 = "virnedra"
// const password1 = "1235"

// userService.registerUser(name, email, password)
// userService.registerUser(name1, email1, password1)

// console.log(userService.showAllUser())

// userService.loginUser(email, password)

// console.log(userService.showAllUser())

// userService.logout(email)

// console.log(userService.showAllUser())
