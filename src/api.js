import axios from 'axios';

// const url = 'http://localhost:4990';
// const url = 'https://hw3-mongo-backend.herokuapp.com';
const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : '';

export async function getGroupList() {
  const res = await axios.get(`${url}/groups`);
  return res.data;
}

export async function addAdmin(groupId, userId) {
  const res = await axios.post(`${url}/groups/${groupId}/admins/${userId}`);
  // return res.data;
}

export async function removeAdmin(groupId, userId) {
  const res = await axios.delete(`${url}/groups/${groupId}/admins/${userId}`);
  // return res.data;
}

export async function requestToJoinGroup(groupId, userName) {
  const res = await axios.post(`${url}/groups/${groupId}/join`, userName);
  return res.data;
}

// 8 Invite a user into a group (public and private) (0)
export async function inviteUser(groupId, userName) {
  const res = await axios.post(`${url}/groups/${groupId}/invite`, userName);
  return res.data;
}

export async function leaveGroup(groupId, userName) {
  const res = await axios.delete(`${url}/groups/${groupId}/leave`, userName);
  return res.data;
}

export async function filterGroupsByTags(tag) {
  const res = await axios.get(`${url}/groups/tags/${tag}`);
  return res.data;
}
