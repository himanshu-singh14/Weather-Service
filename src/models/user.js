const getCurrentTimeStamp = require('../utils/utils.js')

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isLoggedIn = false;
        this.createdAt = getCurrentTimeStamp();
        this.updatedAt = null;
    }
}

module.exports = User