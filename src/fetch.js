const uri = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/' : '/';

async function register(user, pwd) {
  let statusCode;
  await fetch(`${uri}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user,
      password: pwd,
    }),
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    window.console.log(err);
  });
  return statusCode;
}

async function login(name, pwd) {
  let statusCode, id, username;
  await fetch(`${uri}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username: name,
      password: pwd,
    }),
  }).then((res) => res.json()
    .then((data) => {
      id = data.id;
      username = data.username;
      statusCode = res.status;
      window.console.log(data);
  })).catch((err) => {
    window.console.log(err);
  });
  window.localStorage.setItem("username", username);
  window.localStorage.setItem("userId", id);
  return statusCode;
}

async function createGroup(nameV, topic, type) {
  let record;
  await fetch(`${uri}groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name: nameV,
      tag: topic,
      type: type,
    }),
  }).then((res) => {
      record = res.status;
    }).catch((err) => {
      // Print the error if there is one.
      window.console.log(err);
    });
  return record;
}

async function hidePost(postId) {
  let record;
  await fetch(`${uri}posts/${postId}/hide`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
      record = res.status;
    }).catch((err) => {
      // Print the error if there is one.
      window.console.log(err);
    });
  return record;
}

async function getHiddenList() {
  let record = [];
  await fetch(`${uri}posts/hide`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json())
    .then((data) => {
      record = data;
    }).catch((err) => {
      // Print the error if there is one.
      window.console.log(err);
    });
  return record;
}

async function addPost(groupName, titleV, contentV) {
  let statusCode;
  await fetch(`${uri}groups/${groupName}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      title: titleV,
      postContent: contentV,
    }),
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    // Print the error if there is one.
    window.console.log(err);
  });
  return statusCode;
}

async function deletePost(postId) {
  let statusCode;
  await fetch(`${uri}posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    // Print the error if there is one.
    window.console.log(err);
  });
  return statusCode;
}

async function flagPost(postId) {
  let statusCode;
  await fetch(`${uri}posts/${postId}/flag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    statusCode = res.status;
  }).catch((err) => {
    // Print the error if there is one.
    window.console.log(err);
  });
  return statusCode;
}

async function getProfile(username) {
  let res;
  await fetch(`${uri}users/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json())
    .then((data) => {
      //
      res = data;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  return res;
}


async function updateProfile(emailV, genderV, phoneV, linkV) {
  let res;
  await fetch(`${uri}users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailV,
      gender: genderV,
      phone: phoneV,
      link: linkV,
    }),
    credentials: 'include',
  }).then((response) => response.json())
    .then((data) => {
      res = response.status;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  return res;
}

async function updatePwd(pwd) {
  let res;
  await fetch(`${uri}users/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newPassword: pwd,
    }),
    credentials: 'include',
  }).then((response) => response.json())
    .then((data) => {
      res = response.status;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  return res;
}

async function getAllTag(tags) {
  let res;
  await fetch(`${uri}tag/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json())
    .then((data) => {
      res = data;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  return res;
}

async function getGroupAnaly(groupName) {
  let res;
  await fetch(`${uri}groupAnalytic/${groupName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json())
    .then((data) => {
      res = data;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  return res;
}

async function getRecommend() {
  let res;
  await fetch(`${uri}groupRecommendation`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json())
    .then((data) => {
      res = data;
      window.console.log(data);
    }).catch((error) => {
      window.console.log(error);
    });
  return res;
}

async function addComment(postId, contentV) {
  let res;
  await fetch(`${uri}posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: contentV,
    }),
    credentials: 'include',
  }).then((response) => {
    res = response.status;
    }).catch((error) => {
      window.console.log(error);
    });
  return res;
}



async function editComment(groupName, postId, commentId) {
  let res;
  await fetch(`${uri}groups/${groupName}/posts/${postId}/comments/${commentId}`, {
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
    credentials: 'include',
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
    credentials: 'include',
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
  register, login, createGroup, addPost, deletePost, flagPost, getProfile,
  editComment, deleteComment, updateProfile, updatePwd, getAllTag,
  hidePost, getHiddenList, getRecommend, getGroupAnaly, addComment,
};
