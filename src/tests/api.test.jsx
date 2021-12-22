import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as api from '../../src/api';

let mockAdapter;
beforeEach(async () => {
  mockAdapter = new MockAdapter(axios);
});
afterEach(() => {
  mockAdapter.reset();
});

const testFunc = jest.fn();

const groupList = [
  {
    id: '35134',
    name: 'cis557-1',
    tags: 'cis',
    members: [1],
    posts: [1, 2, 3],
  },
  {
    id: '134',
    name: 'cis547-2',
    tags: 'cis',
    members: [6, 1, 3],
    posts: [1, 2],
  },
  {
    id: '35132',
    name: 'cis537-3',
    tags: 'cis',
    members: [1, 5, 6, 6, 6],
    posts: [1],
  },
  {
    id: '3514',
    name: 'dat757-4',
    tags: 'dat',
    members: [1, 4],
    posts: [1, 2, 3, 4],
  },
];

describe('API test', () => {
  test('getGroupList', async () => {
    mockAdapter.onGet().reply(200, groupList);
    const data = await api.getGroupList();
    expect(data).toEqual(groupList);
  });
  test('getGroupPage', async () => {
    mockAdapter.onGet().reply(200, groupList);
    const data = await api.getGroupPage("test");
    expect(data).toEqual(groupList);
  });
  test('addAdmin', () => {
    mockAdapter.onPost().reply(200);
    api.addAdmin("1", "2");
  });
  test('removeAdmin', () => {
    mockAdapter.onDelete().reply(200);
    api.removeAdmin("1", "2");
  });
  test('requestToJoinGroup', () => {
    mockAdapter.onPost().reply(200);
    api.requestToJoinGroup("1");
  });
  test('inviteUser', () => {
    mockAdapter.onPost().reply(200);
    api.inviteUser("1", "2");
  });
  test('leaveGroup', () => {
    mockAdapter.onDelete().reply(200);
    api.leaveGroup("1");
  });
  test('filterGroupsByTags', () => {
    mockAdapter.onGet().reply(200, groupList);
    api.filterGroupsByTags("1", testFunc);
  });
  test('JoinRequestDecision', () => {
    mockAdapter.onPut().reply(200);
    api.JoinRequestDecision("1", "2", true);
  });
  test('getNotification', async () => {
    mockAdapter.onGet().reply(200, groupList);
    const data = await api.getNotification();
    expect(data).toEqual(groupList);
  });
  test('getMessages', async () => {
    mockAdapter.onGet().reply(200, groupList);
    const data = await api.getMessages("test");
    expect(data).toEqual(groupList);
  });
  test('SendMessage', () => {
    mockAdapter.onPost().reply(200);
    api.SendMessage("1", "2", "3");
  });
  test('respondInvitation', () => {
    mockAdapter.onPut().reply(200);
    api.respondInvitation("1", true);
  });
});
