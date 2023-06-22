const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const UserService = require("../services/userservice.js");

const userService = new UserService();

app.get("/", async (req, res) => {
  const result = await userService.showAllUser();
  res.send(result);
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  await userService.registerUser(name, email, password);
  res.send(await userService.getUserByEmail(email));
});

app.patch("/login", async (req, res) => {
  const { email, password } = req.body;
  await userService.loginUser(email, password);
  const user = await userService.getUserByEmail(email);
  res.send(`${user.name} logging successful...`);
});

app.get("/logout", async (req, res) => {
  const email = req.query.email;
  await userService.logout(email);
  const user = await userService.getUserByEmail(email);
  res.send(`${user.name} logout successful...`);
});

app.get("/logout/:email", async (req, res) => {
  const email = req.params.email;
  await userService.logout(email);
  const user = await userService.getUserByEmail(email);
  res.send(`${user.name} logout successful...`);
});

app.delete("/delete/:email", async (req, res) => {
  const email = req.params.email;
  await userService.delete(email);
  res.send(`deleted successful...`);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// postman ---network ---> controller --inter process --->  service --interprocess-> dao --network---> database
