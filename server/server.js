const express = require('express')
const app = express()
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const helmet = require("helmet");

const cors = require('cors');

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({
  origin: '*'
}));

app.post('/users', routes.createUser)
app.post('/login', routes.loginUser)
app.put('/users', routes.checkCookie, routes.updateUser)
app.put('/users/password', routes.checkCookie, routes.changePassword)
app.delete('/users', routes.checkCookie, routes.deleteUser)
app.get('/userInfo', routes.checkCookie, routes.userInfo)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})