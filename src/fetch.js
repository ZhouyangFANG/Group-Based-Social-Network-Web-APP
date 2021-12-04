const uri = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : '/';

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
  statusCode = 200;
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

export {
  register, login, createGroup, addPost
};