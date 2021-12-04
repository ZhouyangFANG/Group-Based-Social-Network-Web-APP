import axios from 'axios';

// const url = 'http://localhost:4990';
// const url = 'https://hw3-mongo-backend.herokuapp.com';
const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : '';


const groupList = [
  {
    id: '35134',
    name: 'cis557',
    tags: 'cis',
  },
  {
    id: '134',
    name: 'cis547',
    tags: 'cis',
  },
  {
    id: '35132',
    name: 'cis537',
    tags: 'cis',
  },
  {
    id: '3514',
    name: 'dat757',
    tags: 'dat',
  },
]

const testGroupPage = {
  id: '35143',
  name: 'cis557',
  admins: ['Bob', 'Alice'],
  members: ['John', 'Kite'],
  tags: 'cis',
  visibility: true,
  posts: [{
    id: '873815',
    title: 'title_1',
    author: 'Kite',
    content: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873816',
    title: 'title_2',
    author: 'John',
    content: 'your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873817',
    title: 'title_3',
    author: 'John',
    content: 'This impressiish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873818',
    title: 'title_4',
    author: 'John',
    content: 'This impressive pafun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,if you like.',
  },
  {
    id: '873819',
    title: 'title_5',
    author: 'Kite',
    content: 'This impressi you like.',
  },
  ],
}


export async function getGroupList(setGroupList) {
  const res = await axios.get(`${url}/groups`);
  setGroupList(res.data);
  // setGroupList(groupList);
}

export async function getGroupPage(groupId, setPage) {
  const res = await axios.get(`${url}/groups/${groupId}`);
  // setPage(res.data);
  // setPage(testGroupPage);
}

export async function addAdmin(groupId, userId) {
  const res = await axios.post(`${url}/groups/${groupId}/admins/${userId}`);
  return res.data;
}

export async function removeAdmin(groupId, userId) {
  const res = await axios.delete(`${url}/groups/${groupId}/admins/${userId}`);
  return res.data;
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

export async function filterGroupsByTags(tag, setGroupList) {
  const res = await axios.get(`${url}/groups/tags/${tag}`);
  setGroupList(res.data);
  // setGroupList(groupList);
}