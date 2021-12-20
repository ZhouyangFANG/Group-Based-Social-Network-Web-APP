import axios from 'axios';

// const url = 'http://localhost:4990';
// const url = 'https://hw3-mongo-backend.herokuapp.com';
const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/api'
  : '/api';

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// const groupList = [
//   {
//     id: '35134',
//     name: 'cis557-1',
//     tags: 'cis',
//     members: [1],
//     posts: [1, 2, 3],
//   },
//   {
//     id: '134',
//     name: 'cis547-2',
//     tags: 'cis',
//     members: [6, 1, 3],
//     posts: [1, 2],
//   },
//   {
//     id: '35132',
//     name: 'cis537-3',
//     tags: 'cis',
//     members: [1, 5, 6, 6, 6],
//     posts: [1],
//   },
//   {
//     id: '3514',
//     name: 'dat757-4',
//     tags: 'dat',
//     members: [1, 4],
//     posts: [1, 2, 3, 4],
//   },
// ];

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
  console.log(res.data);
  // setGroupList(res.data);
  return res.data;
}

export async function getGroupPage(groupName) {
  const res = await axios.get(`${url}/groups/${groupName}`, { withCredentials: true });
  console.log(res.data);
  // await delay(1000);
  // return testGroupPage;
  return res.data;
}

export async function addAdmin(groupName, userName) {
  const res = await axios.post(`${url}/groups/${groupName}/admins/${userName}`, {}, { withCredentials: true });
  console.log(res.data);
  return res.data;
}

export async function removeAdmin(groupName, userName) {
  const res = await axios.delete(`${url}/groups/${groupName}/admins/${userName}`, { withCredentials: true });
  return res.data;
}

export async function requestToJoinGroup(groupName) {
  const res = await axios.post(`${url}/groups/${groupName}/requests`, {}, { withCredentials: true });
  return res.data;
}

// 8 Invite a user into a group (public and private) (0)
export async function inviteUser(groupName, userName) {
  await axios.post(`${url}/groups/${groupName}/invites/${userName}`, {}, { withCredentials: true });
}

export async function leaveGroup(groupName) {
  console.log('leave the group');
  await axios.delete(`${url}/groups/${groupName}/members`, { withCredentials: true });
}

export async function filterGroupsByTags(tag, setGroupList) {
  const res = await axios.get(`${url}/tag/${tag}`, { withCredentials: true });
  setGroupList(res.data);
  // setGroupList(groupList);
}

export async function JoinRequestDecision(groupName, userName, decision) {
  await axios.put(`${url}/groups/${groupName}/requests/${userName}`, { granted: decision }, { withCredentials: true });
}

export async function getNotification() {
  const res = await axios.get(`${url}/notification`, { withCredentials: true });
  return res.data;
}

export async function respondInvitation(groupName, decision) {
  console.log(decision);
  await axios.put(`${url}/invites/${groupName}`, { granted: decision }, { withCredentials: true });
}

export async function getMessages(userName) {
  const res = await axios.get(`${url}/users/${userName}/messages`, { withCredentials: true });
  return res.data;
}

export async function SendMessage(userName, content, type) {
  await axios.post(`${url}/users/${userName}/messages`, { content, type }, { withCredentials: true });
}
