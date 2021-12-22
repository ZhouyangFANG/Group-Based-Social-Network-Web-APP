const mysql = require('mysql');
const app = require('./server');
const request = require('supertest');
const { post, agent } = require('superagent');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.rds_host,
    user: process.env.rds_user,
    password: process.env.rds_password,
    port: process.env.rds_port,
    database: process.env.rds_db
  });
connection.connect();

let userId;
let tagId;
let groupId;
let postId;
let commentId;
let groupName;

afterAll(async () => {
  const p0 = connection.query(`delete invitation from invitation inner join user on invitation.userId = user.id where user.username = 'test'`);
  const p1 = connection.query(`delete request from request inner join groupInfo on request.groupId = groupInfo.id where groupInfo.name = 'testGroup'`);
  const p11 = connection.query(`delete request from request inner join user on request.userId = user.id where user.username = 'test'`);
  const p2 = connection.query(`delete comment from comment inner join user on comment.author = user.id where user.username = 'test'`);
  const p3 = connection.query(`delete member from member inner join groupInfo on member.groupId = groupInfo.id where groupInfo.name = 'testGroup'`);
  const p4 = connection.query(`delete admin from admin inner join groupInfo on admin.groupId = groupInfo.id where groupInfo.name = 'testGroup'`);
  const p5 = connection.query(`delete tagRelation from tagRelation inner join groupInfo on tagRelation.groupId = groupInfo.id where groupInfo.name = 'testGroup'`);
  const p6 = connection.query(`delete from hide where postId != 'null'`);
  const p7 = connection.query(`delete from tag where name = 'testTag'`);
  const p8 = connection.query(`delete post from post inner join user on post.author = user.id where user.username = 'test'`);
  const p9 = connection.query(`delete from user where username = 'test'`);
  const p10 = connection.query(`delete from groupInfo where name = 'testGroup'`);
  await Promise.all([p0, p1, p2, p3, p4, p5, p6]);
  await Promise.all([p7, p8]);
  await Promise.all([p9, p10]);
})

describe('Create player endpoint API & integration tests', () => {
    const agent = request.agent(app);

    test('test register', () =>
    agent.post('/api/users').send({username: 'test', password: 'password'})
    .expect(201) // testing the response status code
    .then((response) => {
      expect(JSON.parse(response.text).username).toBe('test');
      userId = JSON.parse(response.text).id;
      connection.query(`select * from user where id = '${userId}'`, (error, results) => {
        expect(results[0].username).toBe('test');
      });
      //console.log(userId);
    }));

    test('test register duplicate', () =>
    agent.post('/api/users').send({username: 'test', password: 'password'})
    .expect(409) // testing the response status code
    );

    test('test login', () =>
    agent.post('/api/login').send({username: 'test', password: 'password'})
    .expect(200) // testing the response status code
    );


    test('test updateUser', () =>
      agent.put('/api/users').send({email: 'email@fake'})
      .expect(200)
      .then((response) => {
        connection.query(`select * from user where id = '${userId}'`, (error, results) => {
          expect(results[0].email).toBe('email@fake');
        });
      }));

    test('test check cookie and get user info', () =>
    agent.get('/api/users/test')
    .expect(200)
    .then((response) => {
        expect(JSON.parse(response.text).username).toBe('test');
        expect(JSON.parse(response.text).email).toBe('email@fake');
      }));

    test('test change password', () =>
      agent.put('/api/users/password').send({newPassword: 'newpassword'})
      .expect(200));


    test('test create tag', () =>
      agent.post('/api/tag').send({name: 'testTag'})
      .expect(200)
      .then((response) => {
        tagId = JSON.parse(response.text).id;
        //console.log(tagId);
        connection.query(`select * from tag where id = '${tagId}'`, (error, results) => {
          expect(results[0].name).toBe('testTag');
        });
      }) // testing the response status code
    );

    test('test create group', () =>
      agent.post('/api/groups').send({name: 'testGroup', type: 'public', tag: [tagId]})
      .expect(200) // testing the response status code
      .then((response) => {
        groupId = JSON.parse(response.text).id;
        groupName = JSON.parse(response.text).name;
        connection.query(`select * from groupInfo where id = '${groupId}'`, (error, results) => {
          expect(results[0].name).toBe('testGroup');
          connection.query(`select * from tagRelation where groupId = '${groupId}'`, (error, results) =>{
            expect(results[0].tagId).toBe(tagId);
          })
        });
        //console.log(groupId);
      })
    );

    test('test get created group', () => 
      agent.get('/api/groups/testGroup').expect(200).then((response) => {
        const group = JSON.parse(response.text);
        expect(group.name).toBe('testGroup');
      })
    );

    test('test get public group', () =>
      agent.get('/api/groups')
      .expect(200).then((response) => {
        const results = JSON.parse(response.text)
        expect(results).toEqual(
          expect.arrayContaining([
            expect.objectContaining({id: groupId, name: groupName, "is_member": 1})
          ])
        );
      }));

    test('test get groups by tag', () => 
      agent.get('/api/tag/testTag').expect(200).then((response) => {
        const groups = JSON.parse(response.text);
        expect(groups).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ id: groupId, name: groupName, is_member: 1 }),
          ])
        )
      })
    );

    test('test create post', () =>
      agent.post(`/api/groups/${groupName}/posts`)
      .send({
          title: 'postTitle',
          postContent: 'blah blah blah'
      })
      .expect(200)
      .then((response) => {
        postId = JSON.parse(response.text).id;
        connection.query(`select * from post where id = '${postId}'`, (error, results) =>{
          expect(results[0].postContent).toBe('blah blah blah');
        })
      })
    );

    test('test create comment', () => 
      agent.post(`/api/posts/${postId}/comments`).send({
        content: 'test comment',
      }).expect(201).then((response) => {
        commentId = JSON.parse(response.text).id;
        connection.query(`SELECT * FROM comment WHERE id = '${commentId}';`, (error, results) => {
          expect(results[0].content).toBe('test comment');
        })
      })
    );

    test('test delete comment', () => 
      agent.delete(`/api/comments/${commentId}`).expect(200).then((response) => {
        const results = JSON.parse(response.text);
        expect(results.affectedRows).toBe(1);
      })
    );

    test('test flag post', () =>
      agent.post(`/api/posts/${postId}/flag`)
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).affectedRows).toBe(1);
      })
    );

    test('test hide post', () =>
      agent.post(`/api/posts/${postId}/hide`)
      .expect(200).then((response) => {
        connection.query(`select * from hide where postId = '${postId}'`, (error, results) =>{
          expect(results.length).toBe(1);
        })
      }));

    test('test mark post delete', () =>
      agent.delete(`/api/posts/${postId}`)
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).affectedRows).toBe(1);
        connection.query(`select * from post where id = '${postId}'`, (error, results) =>{
          expect(results[0].deleted).toBe(1);
        })
      }));

    test('test group recommendation', () =>
      agent.get(`/api/groupRecommendation`)
      .expect(200));

    test('test get group analytics', () =>
      agent.get(`/api/groupAnalytic/${groupName}`)
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).id).toBe(groupId);
        expect(JSON.parse(response.text).num_member).toBe(1);
        expect(JSON.parse(response.text).num_hidden).toBe(1);
      }));

    test('test invitation', () => 
      agent.post('/api/groups/testGroup/invites/nosuchuser').expect(200).then((response) => {
        expect(JSON.parse(response.text)).toBe('success');
      })
    );

    test('test handling invitation', () => new Promise((resolve) => {
      connection.query(`INSERT INTO invitation(userId, groupId) 
      SELECT '${userId}', groupInfo.id FROM groupInfo WHERE name = 'jiyutestgroup2';`, () => {
        agent.put('/api/invites/jiyutestgroup2').send({ granted: true }).expect(201).then((response) => {
          expect(JSON.parse(response.text)).toBe('request posted');
          connection.query(`DELETE FROM request WHERE userId = '${userId}';`, () => {
            resolve();
          });
        });
      });
    }));

    test('test handling request', () => new Promise((resolve) => {
      connection.query(`INSERT INTO request(userId, groupId) 
      SELECT user.id, '${groupId}' FROM user WHERE username = 'jiyutest1';`, () => {
        agent.put('/api/groups/testGroup/requests/jiyutest1').send({ granted: true }).expect(200).then((response) => {
          expect(JSON.parse(response.text)).toBe('success');
          resolve();
        });
      });
    }));

    test('test add and delete admin', () => 
      agent.post('/api/groups/testGroup/admins/jiyutest1').expect(201).then((response) => {
        expect(JSON.parse(response.text)).toBe('success');
        agent.delete('/api/groups/testGroup/admins/jiyutest1').expect(200).then((response) => {
          expect(JSON.parse(response.text)).toBe('success');
        });
      })
    );
});
