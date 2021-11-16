import axios from 'axios';

const urlBase = 'todo';

const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

async function request(method, urlExt, body = null, withCredentials = true) {
  try {
    const url = urlBase + urlExt;
    let response;
    switch (method) {
      case methods.GET:
        response = await axios.get(url, { withCredentials });
        break;
      case methods.POST:
        response = await axios.post(url, body, { withCredentials });
        break;
      case methods.PUT:
        response = await axios.put(url, body, { withCredentials });
        break;
      case methods.DELETE:
        response = await axios.delete(url, { withCredentials });
        break;
      default:
        response = null;
    }
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return null;
  }
}

/**
 * @typedef {Object} Response
 * @property {Object} data
 * @property {number} status
 */

/**
 * @param {string} username
 * @param {string} password
 * @returns {Response}
 */
function login(username, password) {
  return request(methods.POST, '/login', { username, password }, false);
}

/**
 * @param {string} userId
 * @returns {Response}
 */
function getUser(userId) {
  return request(methods.GET, `/users/${userId}`);
}

/**
 * @param {string} username
 * @param {string} password
 * @returns {Response}
 */
function addUser(username, password) {
  return request(methods.POST, '/users', { username, password }, false);
}

/**
 * @param {string} userId
 * @param {Object} userInfo
 * @returns {Response}
 */
function updateUser(userId, userInfo) {
  return request(methods.PUT, `/users/${userId}`, userInfo);
}

/**
 * @param {string} userId
 * @returns {Response}
 */
function deleteUser(userId) {
  return request(methods.DELETE, `/users/${userId}`);
}

/**
 * @returns {Response}
 */
function getGroups() {
  return request(methods.GET, '/groups');
}

/**
 * @param {string} groupId
 * @returns {Response}
 */
function getGroup(groupId) {
  return request(methods.GET, `/groups/${groupId}`);
}

/**
 * @param {Object} group
 * @returns {Response}
 */
function addGroup(group) {
  return request(methods.POST, '/groups', group);
}

/**
 * @param {string} groupId
 * @param {string} postId
 * @returns {Response}
 */
function getPost(groupId, postId) {
  return request(methods.GET, `/groups/${groupId}/posts/${postId}`);
}

/**
 * @param {string} groupId
 * @param {Object} post
 * @returns {Response}
 */
function addPost(groupId, post) {
  return request(methods.POST, `/groups/${groupId}`, post);
}

/**
 * @param {string} groupId
 * @param {string} postId
 * @returns {Response}
 */
function deletePost(groupId, postId) {
  return request(methods.DELETE, `/groups/${groupId}/posts/${postId}`);
}

/**
 * @param {string} groupId
 * @param {string} postId
 * @returns {Response}
 */
function getComments(groupId, postId) {
  return request(methods.GET, `/groups/${groupId}/posts/${postId}`);
}

/**
 * @param {string} groupId
 * @param {string} postId
 * @param {Object} comment
 * @returns {Response}
 */
function addComment(groupId, postId, comment) {
  return request(methods.POST, `/groups/${groupId}/posts/${postId}`, comment);
}

/**
 * @param {string} groupId
 * @param {string} postId
 * @param {string} commentId
 * @param {Object} comment
 * @returns {Response}
 */
function updateComment(groupId, postId, commentId, comment) {
  return request(methods.POST, `/groups/${groupId}/posts/${postId}/comments/${commentId}`, comment);
}

/**
 * @param {string} groupId
 * @param {string} postId
 * @param {string} commentId
 * @returns {Response}
 */
function deleteComment(groupId, postId, commentId) {
  return request(methods.POST, `/groups/${groupId}/posts/${postId}/comments/${commentId}`);
}

export {
  login,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getGroups,
  getGroup,
  addGroup,
  getPost,
  addPost,
  deletePost,
  getComments,
  addComment,
  updateComment,
  deleteComment,
};
