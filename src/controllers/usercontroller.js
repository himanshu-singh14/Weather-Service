const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const UserService = require('../services/userservice.js')

const userService = new UserService()

app.get('/', (req, res) => {
  res.send(userService.showAllUser())
})

app.post('/register', (req, res) => {
  const {name, email, password} = req.body
  userService.registerUser(name, email, password)
  res.send(userService.getUserByEmail(email))
})

app.patch('/login', (req, res) => {
  const {email, password} = req.body
  userService.loginUser(email, password)
  res.send(`${userService.getUserByEmail(email).name} logging successful...`)
})

app.get('/logout', (req, res) => {
  const email = req.query.email
  userService.logout(email)
  res.send(`${userService.getUserByEmail(email).name} logout successful...`)
})

app.get('/logout/:email',  (req, res) => {
  const email = req.params.email
  userService.logout(email)
  res.send(`${userService.getUserByEmail(email).name} logout successful...`)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})