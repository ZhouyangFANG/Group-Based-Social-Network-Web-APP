const mysql = require('mysql');
const async = require('async');
const uuid = require('uuid');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.rds_host,
  user: process.env.rds_user,
  password: process.env.rds_password,
  port: process.env.rds_port,
  database: process.env.rds_db,
});
connection.connect();

function _getGroup(req, res, callback) { // eslint-disable-line no-underscore-dangle
  connection.query(`SELECT * FROM groupInfo WHERE name = '${req.params.groupname}';`, (error, results) => {
    if (error) {
      res.status(400).json({ error });
    } else if (results.length === 0) {
      res.status(404).json('group not found');
    } else {
      callback(results[0]);
    }
  });
}

function getGroups(req, res) {
  connection.query(`SELECT groupInfo.* FROM groupInfo INNER JOIN member ON groupInfo.id = member.groupId WHERE member.userId = '${req.userInfo.id}';`, (error0, results0) => {
    connection.query(`SELECT * FROM groupInfo
    WHERE NOT EXISTS (SELECT * FROM member WHERE userId = '${req.userInfo.id}' AND groupId = groupInfo.id) AND type = 1;`, (error1, results1) => {
      res.status(200).json({ joined: results0, public: results1 });
    });
  });
}

function createGroup(req, res) {
  const { name, type } = req.body;
  const groupId = uuid.v4();
  const typeBool = type === 'public';
  connection.query(`INSERT INTO groupInfo(id, name, type) VALUES ('${groupId}', '${name}', ${typeBool});`, (error0) => {
    if (error0) {
      res.status(400).json({ error: error0 });
    } else {
      connection.query(`INSERT INTO admin(userId, groupId) VALUES ('${req.userInfo.id}', '${groupId}');`);
      connection.query(`INSERT INTO member(userId, groupId) VALUES ('${req.userInfo.id}', '${groupId}');`);
      async.forEachOf(
        req.body.tag,
        (tagElement, i, callback) => {
          connection.query(`INSERT INTO tagRelation(groupId, tagId) VALUES ('${groupId}', '${tagElement}');`, (error1) => {
            if (error1) {
              callback(error1);
            } else {
              callback(null);
            }
          });
        },
        (error2) => {
          if (error2) {
            res.status(400).json({ error: error2 });
          } else {
            res.status(200).json('success');
          }
        },
      );
    }
  });
}

function getMembers(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM member WHERE userId = '${req.userInfo.id}' AND groupId = '${group.id}';`, (error1, results1) => {
      if (error1) {
        res.status(400).json({ error: error1 });
      } else if (results1.length === 0) {
        res.status(403).json('member permission needed');
      } else {
        connection.query(`SELECT user.* FROM user INNER JOIN member ON member.userId = user.id WHERE member.groupId = '${group.id}';`, (error2, results2) => {
          if (error2) {
            res.status(400).json({ error: error2 });
          } else {
            res.status(200).json(results2);
          }
        });
      }
    });
  });
}

function addMember(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM admin WHERE userId = '${req.userInfo.id}' AND groupId = '${group.id}';`, (error0, results0) => {
      if (error0 || results0.length === 0) {
        res.status(403).json('admin permission needed');
      } else {
        connection.query(`INSERT INTO member(userId, groupId) SELECT user.id, '${group.id}' FROM user WHERE username = '${req.params.username}';`, (error1) => {
          if (error1) {
            res.status(400).json({ error: error1 });
          } else {
            res.status(201).json('success');
          }
        });
      }
    });
  });
}

function addAdmin(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM admin WHERE userId = '${req.userInfo.id}' AND groupId = '${group.id}';`, (error1, results1) => {
      if (error1) {
        res.status(400).json({ error: error1 });
      } else if (results1.length === 0) {
        res.status(403).json('admin permission needed');
      } else {
        connection.query(`SELECT * FROM user WHERE username = '${req.params.username}';`, (error2, results2) => {
          if (error2) {
            res.status(400).json({ error: error2 });
          } else if (results2.length === 0) {
            res.status(404).json('user not found');
          } else {
            const [user] = results2;
            connection.query(`SELECT * FROM member WHERE userId = '${user.id}' AND groupId = '${group.id}';`, (error3, results3) => {
              if (error3) {
                res.status(400).json({ error: error3 });
              } else if (results3.length === 0) {
                res.status(404).json('member not found');
              } else {
                connection.query(`INSERT INTO admin(userId, groupId) VALUES ('${user.id}', '${group.id}');`, (error4) => {
                  if (error4) {
                    res.status(400).json({ error: error4 });
                  } else {
                    res.status(201).json('success');
                  }
                });
              }
            });
          }
        });
      }
    });
  });
}

function deleteAdmin(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM admin WHERE userId = '${req.userInfo.id}' AND groupId = '${group.id}';`, (error0, results0) => {
      if (error0) {
        res.status(400).json({ error: error0 });
      } else if (results0.length === 0) {
        res.status(403).json('admin permission needed');
      } else {
        connection.query(`DELETE admin FROM admin INNER JOIN user ON admin.userId = user.id
        WHERE user.username = '${req.params.username}' AND admin.groupId = '${group.id}';`, (error1) => {
          if (error1) {
            res.status(400).json({ error: error1 });
          } else {
            res.status(200).json('success');
          }
        });
      }
    });
  });
}

function getAdmins(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM member WHERE userId = '${req.userInfo.id}' AND groupId = '${group.id}';`, (error1, results1) => {
      if (error1) {
        res.status(400).json({ error: error1 });
      } else if (results1.length === 0) {
        res.status(403).json('member permission needed');
      } else {
        connection.query(`SELECT user.* FROM user INNER JOIN admin ON admin.userId = user.id WHERE admin.groupId = '${group.id}';`, (error2, results2) => {
          if (error2) {
            res.status(400).json({ error: error2 });
          } else {
            res.status(200).json(results2);
          }
        });
      }
    });
  });
}

function postRequest(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`INSERT INTO request(userId, groupId) VALUES ('${req.userInfo.id}', '${group.id}');`, (error1) => {
      if (error1) {
        if (error1.code === 'ER_DUP_ENTRY') {
          res.status(409).json({ message: error1.sqlMessage });
        } else {
          res.status(400).json({ error: error1 });
        }
      } else {
        res.status(201).json('success');
      }
    });
  });
}

function postInvitation(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM user WHERE username = '${req.params.username}';`, (error1, results1) => {
      if (error1) {
        res.statu(400).json({ error: error1 });
      } else if (results1.length === 0) {
        res.status(404).json('user not found');
      } else {
        const [user] = results1;
        connection.query(`INSERT INTO invitation(userId, groupId) VALUES ('${user.id}', '${group.id}');`, (error2) => {
          if (error2) {
            if (error2.code === 'ER_DUP_ENTRY') {
              res.status(409).json({ message: error2.sqlMessage });
            } else {
              res.status(400).json({ error: error2 });
            }
          } else {
            res.status(201).json('success');
          }
        });
      }
    });
  });
}

function leaveGroup(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`DELETE FROM member WHERE userId = '${req.userInfo.id}' and groupId = '${group.id}';`, (error1, results1) => {
      if (error1) {
        res.status(400).json({ error: error1 });
      } else if (results1.affectedRows === 0) {
        res.status(404).json('not a member of the group');
      } else {
        res.status(200).json('success');
      }
    });
  });
}

function getPosts(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM post WHERE groupId = '${group.id}';`, (error0, results0) => {
      if (error0) {
        res.status(400).json({ error: error0 });
      } else {
        async.forEachOf(
          results0,
          (post, i, callback) => {
            connection.query(`SELECT * FROM comment WHERE postId = '${post.id}' ORDER BY datetime DESC;`, (error1, results1) => {
              if (error1) {
                callback(error1);
              } else {
                post.comments = results1;
              }
            });
          },
          (error2) => {
            if (error2) {
              res.status(400).json({ error: error2 });
            } else {
              group.posts = results0;
              res.status(200).json(group);
            }
          },
        );
      }
    });
  });
}

function postComment(req, res) {
  const id = uuid.v4();
  const { postId } = req.params;
  const content = req.body;
  const userId = req.userInfo.id;
  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  connection.query(`INSERT INTO comment(id, postId, content, author, datetime)
  VALUES ('${id}', '${postId}', '${content}', '${userId}', '${datetime}');`, (error) => {
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(201).json({
        id, postId, content, userId, datetime,
      });
    }
  });
}

function getMessages(req, res) {
  connection.query(`SELECT * FROM user WHERE username = '${req.params.username}';`, (error0, results0) => {
    if (error0) {
      res.status(400).json({ error: error0 });
    } else if (results0.length === 0) {
      res.status(404).json('user not found');
    } else {
      const userId = req.userInfo.id;
      const otherId = results0[0].id;
      connection.query(`SELECT * FROM message
      WHERE (sender = '${userId}' and receiver = '${otherId}') or (sender = '${otherId}' and receiver = '${userId}')
      ORDER BY time DESC`, (error1, results1) => {
        if (error1) {
          res.status(400).json({ error: error1 });
        } else {
          res.status(200).json(results1);
        }
      });
    }
  });
}

function postMessage(req, res) {
  const { receiver, content, type } = req.body;
  if (type !== 'text' && type !== 'audio' && type !== 'image' && type !== 'video') {
    res.status.json(400).json('invalid content type');
  } else {
    connection.query(`SELECT * FROM user WHERE username = '${receiver}';`, (error0, results0) => {
      if (error0) {
        res.status(400).json({ error: error0 });
      } else if (results0.length === 0) {
        res.status(404).json('user not found');
      } else {
        const userId = req.userInfo.id;
        const otherId = results0[0].id;
        if (userId === otherId) {
          res.status(400).json('cannot send message to self');
        } else {
          const id = uuid.v4();
          const time = new Date().toISOString().slice(0, 19).replace('T', ' ');
          connection.query(`INSERT INTO message(id, sender, receiver, time, content, type)
          VALUES ('${id}', '${userId}', '${otherId}', '${time}', BINARY(:data), '${type}');`, { content }, (error1) => {
            if (error1) {
              res.status(400).json({ error: error1 });
            } else {
              res.status(201).json({
                id, userId, otherId, time, content, type,
              });
            }
          });
        }
      }
    });
  }
}

module.exports = {
  getGroups,
  createGroup,
  getMembers,
  addMember,
  leaveGroup,
  addAdmin,
  deleteAdmin,
  getAdmins,
  postRequest,
  postInvitation,
  getPosts,
  postComment,
  getMessages,
  postMessage,
};
