const express = require('express')
const app = express()
const routes = require('./routes')

const cors = require('cors');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({
  origin: '*'
}));

app.post('/users', routes.postUser)
app.post('/login', routes.loginUser)

//---------userInfo API------------
app.get('/users/:id', routes.getUserInfo);
app.put('/users/:id', routes.updateUserInfo);
app.delete('/users/:id', routes.deleteUserInfo);

app.use(require('./groupRouter'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})