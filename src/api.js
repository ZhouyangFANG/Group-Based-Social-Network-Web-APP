import axios from 'axios';

// const url = 'http://localhost:4990';
// const url = 'https://hw3-mongo-backend.herokuapp.com';
const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/api'
  : '/api';

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// const testGroupPage = {
//   id: '35143',
//   name: 'cis557',
//   admins: ['Bob', 'Alice'],
//   members: ['John', 'Kite'],
//   tags: 'cis',
//   type: true,
//   posts: [{
//     id: '873815',
//     title: 'title_1',
//     author: 'Kite',
//     flag: true,
//     postContent: 'This d 1 cup of frozen peas along with the mussels,if you like.',
//   },
//   {
//     id: '873816',
//     title: 'title_2',
//     author: 'John',
//     flag: false,
//     postContent: 'your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
//   },
//   {
//     id: '873817',
//     title: 'title_3',
//     author: 'John',
//     flag: true,
//     postContent: 'ssels,if you like.',
//   },
//   {
//     id: '873818',
//     title: 'title_4',
//     author: 'John',
//     flag: false,
//     postContent: 'This impressive pafun meal to cook togetheg with the mussels,if you like.',
//   },
//   {
//     id: '873819',
//     title: 'title_5',
//     author: 'Kite',
//     flag: true,
//     postContent: 'This impressi you like.',
//   },
//   ],
// };

export async function getGroupList() {
  const res = await axios.get(`${url}/groups`, { withCredentials: true });
  // console.log(res.data);
  // setGroupList(res.data);
  return res.data;
}

export async function getGroupPage(groupName) {
  const res = await axios.get(`${url}/groups/${groupName}`, { withCredentials: true });
  // console.log(res.data);
  // await delay(1000);
  // return testGroupPage;
  return res.data;
}

export function addAdmin(groupName, userName) {
  axios.post(`${url}/groups/${groupName}/admins/${userName}`, {}, { withCredentials: true });
}

export function removeAdmin(groupName, userName) {
  axios.delete(`${url}/groups/${groupName}/admins/${userName}`, { withCredentials: true });
}

export function requestToJoinGroup(groupName) {
  axios.post(`${url}/groups/${groupName}/requests`, {}, { withCredentials: true });
}

// 8 Invite a user into a group (public and private) (0)
export function inviteUser(groupName, userName) {
  axios.post(`${url}/groups/${groupName}/invites/${userName}`, {}, { withCredentials: true });
}

export function leaveGroup(groupName) {
  // console.log('leave the group');
  axios.delete(`${url}/groups/${groupName}/members`, { withCredentials: true });
}

export async function filterGroupsByTags(tag, setGroupList) {
  const res = await axios.get(`${url}/tag/${tag}`, { withCredentials: true });
  setGroupList(res.data);
  // setGroupList(groupList);
}

export function JoinRequestDecision(groupName, userName, decision) {
  axios.put(`${url}/groups/${groupName}/requests/${userName}`, { granted: decision }, { withCredentials: true });
}

export async function getNotification() {
  const res = await axios.get(`${url}/notification`, { withCredentials: true });
  return res.data;
}

export function respondInvitation(groupName, decision) {
  axios.put(`${url}/invites/${groupName}`, { granted: decision }, { withCredentials: true });
}

export async function getMessages(userName) {
  const res = await axios.get(`${url}/users/${userName}/messages`, { withCredentials: true });
  return res.data;
}

export function SendMessage(userName, content, type) {
  axios.post(`${url}/users/${userName}/messages`, { content, type }, { withCredentials: true });
}
