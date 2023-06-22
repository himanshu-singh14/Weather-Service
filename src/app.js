const express = require("express");
const app = express();
app.use(express.json());

// Import controllers
const userController = require("./controllers/usercontroller.js");
const weatherController = require("./controllers/weathercontroller.js");

// Use the controllers for specific routes
app.use("/users", userController);
app.use("/weathers", weatherController);

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
