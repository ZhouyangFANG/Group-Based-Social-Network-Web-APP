const mysql = require('mysql');
const app = require('./server');
const request = require('supertest');
const { post } = require('superagent');
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

afterAll(async () => {
    connection.query(`delete from member where userId = '${userId}'`);
    connection.query(`delete from admin where userId = '${userId}'`);
    connection.query(`delete from tagRelation where tagId = '${tagId}'`);
    connection.query(`delete from tag where id = '${tagId}'`);
    connection.query(`delete from hide where postId = '${postId}'`);
    connection.query(`delete from post where id = '${postId}'`);
    connection.query(`delete from user where id = '${userId}'`);
    connection.query(`delete from groupInfo where id = '${groupId}'`);
})

describe('Create player endpoint API & integration tests', () => {
    const agent = request.agent(app);
  
    test('test register', () => 
    request(app).post('/api/users').send({username: 'test', password: 'password'})
    .expect(201) // testing the response status code
    .then((response) => {
      expect(JSON.parse(response.text).username).toBe('test');
      userId = JSON.parse(response.text).id;
    }));

    test('test register duplicate', () => 
    agent.post('/api/users').send({username: 'test', password: 'password'})
    .expect(409) // testing the response status code
    );

    let res;

    test('test login', () => 
    agent.post('/api/login').send({username: 'test', password: 'password'})
    .expect(200) // testing the response status code
    );
    

    test('test updateUser', () => 
      agent.put('/api/users').send({email: 'email@fake'})
      .expect(200)); // testing the response status code

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
      }) // testing the response status code
    );

    test('test create group', () => 
      agent.post('/api/group').send({name: 'testGroup', type: 'public', tag: [tagId]})
      .expect(200) // testing the response status code
      .then((response) => {
        groupId = JSON.parse(response.text).id;
      })
    );

    test('test get public group', () => 
      agent.get('/api/group')
      .expect(200));

    test('test create post', () => 
      agent.post(`/api/groups/${groupId}/posts`)
      .send({
          title: 'postTitle',
          postContent: 'blah blah blah'
      })
      .expect(200)
      .then((response) => {
        postId = JSON.parse(response.text).id;
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
      .expect(200));

    test('test mark post delete', () => 
      agent.delete(`/api/posts/${postId}`)
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).affectedRows).toBe(1);
      }));

      test('test get hide post', () => 
      agent.get(`/api/posts/hide`)
      .expect(200));

    test('test group recommendation', () => 
      agent.get(`/api/groupRecommendation`)
      .expect(200));

    test('test get group analytics', () => 
      agent.get(`/api/groupAnalytic/${groupId}`)
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).id).toBe(groupId);
        expect(JSON.parse(response.text).num_member).toBe(1);
        expect(JSON.parse(response.text).num_hidden).toBe(1);
      }));
});
  