import axios from 'axios';

// const url = 'http://localhost:4990';
// const url = 'https://hw3-mongo-backend.herokuapp.com';
const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/api'
  : '/api';

const delay = ms => new Promise(res => setTimeout(res, ms));

const groupList = [
  {
    id: '35134',
    name: 'cis557-1',
    tags: 'cis',
    members: [1],
    posts: [1,2,3],
  },
  {
    id: '134',
    name: 'cis547-2',
    tags: 'cis',
    members: [6,1,3],
    posts: [1,2],
  },
  {
    id: '35132',
    name: 'cis537-3',
    tags: 'cis',
    members: [1,5,6,6,6],
    posts: [1],
  },
  {
    id: '3514',
    name: 'dat757-4',
    tags: 'dat',
    members: [1,4],
    posts: [1,2,3,4],
  },
]

const testGroupPage = {
  id: '35143',
  name: 'cis557',
  admins: ['Bob', 'Alice'],
  members: ['John', 'Kite'],
  tags: 'cis',
  type: true,
  posts: [{
    id: '873815',
    title: 'title_1',
    author: 'Kite',
    flag: true,
    postContent: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873816',
    title: 'title_2',
    author: 'John',
    flag: false,
    postContent: 'your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873817',
    title: 'title_3',
    author: 'John',
    flag: true,
    postContent: 'This impressiish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873818',
    title: 'title_4',
    author: 'John',
    flag: false,
    postContent: 'This impressive pafun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873819',
    title: 'title_5',
    author: 'Kite',
    flag: true,
    postContent: 'This impressi you like.',
  },
  ],
}


export async function getGroupList(setGroupList) {
  const res = await axios.get(`${url}/groups`);
  setGroupList(res.data);
  // setGroupList(groupList);
}

export async function getGroupPage(groupName) {
  const res = await axios.get(`${url}/groups/${groupName}`);
  // await delay(1000);
  // return testGroupPage;
  return res.data;
}

export async function addAdmin(groupName, userId) {
  const res = await axios.post(`${url}/groups/${groupName}/admins/${userId}`);
  return res.data;
}

export async function removeAdmin(groupName, userId) {
  const res = await axios.delete(`${url}/groups/${groupName}/admins/${userId}`);
  return res.data;
}

export async function requestToJoinGroup(groupName, userName) {
  const res = await axios.post(`${url}/groups/${groupName}/join`, userName);
  return res.data;
}

// 8 Invite a user into a group (public and private) (0)
export async function inviteUser(groupName, userName) {
  const res = await axios.post(`${url}/groups/${groupName}/invite`, userName);
  return res.data;
}

export async function leaveGroup(groupName, userName) {
  const res = await axios.delete(`${url}/groups/${groupName}/leave`, userName);
  return res.data;
}

export async function filterGroupsByTags(tag, setGroupList) {
  const res = await axios.get(`${url}/groups/tags/${tag}`);
  setGroupList(res.data);
  // setGroupList(groupList);
}
