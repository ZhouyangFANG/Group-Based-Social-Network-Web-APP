const uri = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : '/';

async function register(user, emailV, pwd) {
  let statusCode;
  await fetch(`${uri}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user,
      email: emailV,
      password: pwd,
    }),
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    window.console.log(err);
  });
  statusCode = 201;
  return statusCode;
}

async function login(name, pwd) {
  let statusCode;
  await fetch(`${uri}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: name,
      password: pwd,
    }),
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    window.console.log(err);
  });
  return statusCode;
}

async function createGroup(nameV, topic, type, personName) {
  let record;
  await fetch(`${uri}groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameV,
      // admin: group.admin,
      members: personName,
      tags: topic,
      groupType: type,
    }),
  }).then((res) => res.json())
    .then((recordL) => {
      record = recordL;
    }).catch((err) => {
      // Print the error if there is one.
      window.console.log(err);
    });
  return record;
}

async function addPost(groupName, titleV, authorV, contentV) {
  let statusCode;
  await fetch(`${uri}api/groups/${groupName}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: titleV,
      // admin: group.admin,
      author: authorV,
      content: contentV,
    }),
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    // Print the error if there is one.
    window.console.log(err);
  });
  statusCode = 404;//200;// 404
  return statusCode;
}

async function deletePost(postId) {
  let statusCode;
  await fetch(`${uri}api/groups/${postId}/posts`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    // Print the error if there is one.
    window.console.log(err);
  });
  statusCode = 404;
  return statusCode;
}

async function flagPost(postId) {
  let statusCode;
  await fetch(`${uri}api/groups/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    // Print the error if there is one.
    window.console.log(err);
  });
  statusCode = 404;
  return statusCode;
}

async function getProfile(username) {
  let res;
  await fetch(`${uri}api/users/${username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      //
      res = data;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  res = {email: 'aaa@', phone: '12345', gender: 'famale'};
  return res;
}

async function editComment(username) {
  let res;
  await fetch(`${uri}/api/groups/${groupName}/posts/${postId}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: titleV,
      // admin: group.admin,
      author: authorV,
      content: contentV,
    }),
  }).then((response) => response.json())
    .then((data) => {
      //
      res = data;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  res = {email: 'aaa@', phone: '12345', gender: 'famale'};
  return res;
}

async function deleteComment(username) {
  let res;
  await fetch(`${uri}/api/groups/${groupName}/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: titleV,
      // admin: group.admin,
      author: authorV,
      content: contentV,
    }),
  }).then((response) => response.json())
    .then((data) => {
      //
      res = data;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  res = {email: 'aaa@', phone: '12345', gender: 'famale'};
  return res;
}

export {
  register, login, createGroup, addPost, deletePost, flagPost, getProfile, editComment, deleteComment,
};
