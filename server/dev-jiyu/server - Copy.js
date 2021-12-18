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
app.get('/logout', routes.checkCookie, routes.logout)

app.put('/users', routes.checkCookie, routes.updateUser)
app.put('/users/password', routes.checkCookie, routes.changePassword)
app.delete('/users', routes.checkCookie, routes.deleteUser)

app.get('/users/:username', routes.checkCookie, routes.userInfo)

app.get('/groups', routes.checkCookie, routes.getGroups)
app.get('/tag', routes.checkCookie, routes.getTags)

app.post('/group', routes.checkCookie, routes.createGroup)
app.post('/tag', routes.checkCookie, routes.createTag)

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.get('/api/groups/:groupname/members', routes.checkCookie, routes.getMembers);
app.post('/api/groups/:groupname/members/:username', routes.checkCookie, routes.addMember);
app.delete('/api/groups/:groupname/members', routes.checkCookie, routes.leaveGroup);

app.get('/api/groups/:groupname/admins', routes.checkCookie, routes.getAdmins);
app.post('/api/groups/:groupname/admins/:username', routes.checkCookie, routes.addAdmin);
app.delete('/api/groups/:groupname/admins/:username', routes.checkCookie, routes.deleteAdmin);

app.post('/api/groups/:groupname/requests', routes.checkCookie, routes.postRequest);
app.post('/api/groups/:groupname/invites/:username', routes.checkCookie, routes.postInvitation);

app.get('/api/groups/:groupname', routes.checkCookie, routes.getPosts);

app.post('/api/posts/:postId/comments', routes.checkCookie, routes.postComment);

app.get('/api/users/:username/messages', routes.checkCookie, routes.getMessages);
app.post('/api/users/:username/messages', routes.checkCookie, routes.postMessage);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})