const express = require("express");
const router = express.Router();

const UserService = require("../services/userservice.js");

const userService = new UserService();

router.get("/", async (req, res) => {
  const result = await userService.showAllUser();
  res.send(result);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  await userService.registerUser(name, email, password);
  res.send(await userService.getUserByEmail(email));
});

router.patch("/login", async (req, res) => {
  const { email, password } = req.body;
  await userService.loginUser(email, password);
  const user = await userService.getUserByEmail(email);
  res.send(`${user.name} logging successful...`);
});

router.get("/logout", async (req, res) => {
  const email = req.query.email;
  await userService.logout(email);
  const user = await userService.getUserByEmail(email);
  res.send(`${user.name} logout successful...`);
});

router.get("/logout/:email", async (req, res) => {
  const email = req.params.email;
  await userService.logout(email);
  const user = await userService.getUserByEmail(email);
  res.send(`${user.name} logout successful...`);
});

router.delete("/delete/:email", async (req, res) => {
  const email = req.params.email;
  await userService.delete(email);
  res.send(`deleted successful...`);
});

module.exports = router;
// postman ---network ---> controller --inter process --->  service --interprocess-> dao --network---> database
