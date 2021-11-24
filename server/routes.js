const mysql = require('mysql');
const sha256 = require('js-sha256');
require('dotenv').config();
uuid = require('uuid');

const connection = mysql.createConnection({
  host: process.env.rds_host,
  user: process.env.rds_user,
  password: process.env.rds_password,
  port: process.env.rds_port,
  database: process.env.rds_db
});
connection.connect();

async function postUser(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const passwordHash = sha256(password);
    const uuidv4 = uuid.v4();
    connection.query(`INSERT INTO  user(id, username, password)
    values ('${uuidv4}', '${username}', '${passwordHash}');`, function (error, results, fields) {
      if (error) {
        if(error.code === 'ER_DUP_ENTRY'){
          res.status(409)
          res.json({ message: error.sqlMessage })
        } else {
          res.status(400)
          res.json({ error: error })
        }
      } else if (results) {
        res.status(201)
        res.json({ id: uuidv4, username: username, password: passwordHash})
      }
    });
}

async function loginUser(req, res){
    const username = req.body.username;
    const password = req.body.password;
    connection.query(`SELECT * from user where 
    username ='${username}';`, function (error, results, fields) {
      if (error) {
        res.status(400)
        res.json({ error: error })
      } else if (results.length !== 1) {
        res.status(400)
        res.json('No such user')
      } else {
          if (results[0].username === username && results[0].password === sha256(password)){
            res.status(200)
            res.json('auth succsess')
          } else {
            res.status(400)
            res.json('Password incorrect')  
          }
      }
    });
}

module.exports = {
    postUser,
    loginUser
  };