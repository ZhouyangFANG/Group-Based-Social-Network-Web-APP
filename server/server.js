const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.post('/api/users', routes.createUser);
app.post('/api/login', routes.loginUser);
app.get('/api/logout', routes.checkCookie, routes.logout);

app.put('/api/users', routes.checkCookie, routes.updateUser);
app.put('/api/users/password', routes.checkCookie, routes.changePassword);
app.delete('/api/users', routes.checkCookie, routes.deleteUser);

app.get('/api/users/:username', routes.checkCookie, routes.getUserInfo);

app.get('/api/groups', routes.checkCookie, routes.getPublicGroups);
app.get('/api/tag', routes.checkCookie, routes.getTags);

app.post('/api/groups', routes.checkCookie, routes.createGroup);
app.post('/api/tag', routes.checkCookie, routes.createTag);

app.post('/api/groups/:groupname/posts', routes.checkCookie, routes.createPost);
app.delete('/api/posts/:postId', routes.checkCookie, routes.deletePost);
app.post('/api/posts/:postId/flag', routes.checkCookie, routes.flagPost);
app.post('/api/posts/:postId/hide', routes.checkCookie, routes.hidePost);
app.get('/api/posts/hide', routes.checkCookie, routes.getHidePost);

app.delete('/api/comments/:commentId', routes.checkCookie, routes.deleteComment);

app.get('/api/groupRecommendation', routes.checkCookie, routes.groupRecommendation);

app.get('/api/groupAnalytic/:groupId', routes.checkCookie, routes.groupAnalytic);

app.post('/api/groups/:groupname/members/:username', routes.checkCookie, routes.addMember);
app.delete('/api/groups/:groupname/members', routes.checkCookie, routes.leaveGroup);

app.post('/api/groups/:groupname/admins/:username', routes.checkCookie, routes.addAdmin);
app.delete('/api/groups/:groupname/admins/:username', routes.checkCookie, routes.deleteAdmin);

app.post('/api/groups/:groupname/requests', routes.checkCookie, routes.postRequest);
app.post('/api/groups/:groupname/invites/:username', routes.checkCookie, routes.postInvitation);

app.get('/api/groups/:groupname', routes.checkCookie, routes.getPosts);

app.post('/api/posts/:postId/comments', routes.checkCookie, routes.postComment);

app.get('/api/users/:username/messages', routes.checkCookie, routes.getMessages);
app.post('/api/users/:username/messages', routes.checkCookie, routes.postMessage);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
