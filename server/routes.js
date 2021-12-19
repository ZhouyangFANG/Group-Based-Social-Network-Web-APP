const mysql = require('mysql');
const sha256 = require('js-sha256');
require('dotenv').config();
const uuid = require('uuid');
const crypto = require('crypto');
const async = require('async');

const algorithm = 'aes-256-ctr';
const secretKey = 'xBLCvFTxhjkqjYTC2ynYuSVg3o6YMB1j';
const iv = 'blahblahblahblah';

const connection = mysql.createConnection({
  host: process.env.rds_host,
  user: process.env.rds_user,
  password: process.env.rds_password,
  port: process.env.rds_port,
  database: process.env.rds_db,
});
connection.connect();

function dbQuery(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    })
  })
}

async function checkCookie(req, res, next) {
  const cookie = req.cookies.token;
  if (!cookie) {
    res.status(400);
    res.json({ message: 'no cookie, please login' });
  } else {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(cookie, 'hex')), decipher.final()]).toString();
    let userInfo;
    try {
      userInfo = JSON.parse(decrpyted);
    } catch (e) {
      res.status(400);
      res.json({ message: 'tampered cookie' });
      return;
    }

    const { username, password } = userInfo;

    if (!username || !password) {
      res.status(400);
      res.json({ message: 'tampered cookie' });
    } else {
      connection.query(`SELECT * from user where
        username ='${username}';`, (error, results) => {
        if (error) {
          res.status(400);
          res.json({ message: 'tampered cookie', error });
        } else if (results.length !== 1) {
          res.status(400);
          res.json({ message: 'tampered cookie, No such user' });
        } else if (results[0].username === username && results[0].password === sha256(password)) {
          [req.userInfo] = results;
          next();
        } else {
          res.status(400);
          res.json({ message: 'tampered cookie, password incorrect' });
        }
      });
    }
  }
}

async function createUser(req, res) {
  const { username, password } = req.body;
  const passwordHash = sha256(password);
  const uuidv4 = uuid.v4();
  connection.query(`INSERT INTO  user(id, username, password, registerDate)
    values ('${uuidv4}', '${username}', '${passwordHash}', '${new Date().toISOString().slice(0, 10)}');`, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409);
        res.json({ message: error.sqlMessage });
      } else {
        res.status(400);
        res.json({ error });
      }
    } else if (results) {
      res.status(201);
      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
      const tokenJson = {
        username,
        password,
      };
      const tokenString = JSON.stringify(tokenJson);
      const encrypted = Buffer.concat([cipher.update(tokenString), cipher.final()]).toString('hex');
      res.cookie('token', encrypted, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
      });
      res.json({ id: uuidv4, username, password: passwordHash });
    }
  });
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  connection.query(`SELECT * from user where
    username ='${username}';`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else if (results.length !== 1) {
      res.status(400);
      res.json('No such user');
    } else if (results[0].username === username && results[0].password === sha256(password)) {
      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
      const tokenJson = {
        username,
        password,
      };
      const tokenString = JSON.stringify(tokenJson);
      const encrypted = Buffer.concat([cipher.update(tokenString), cipher.final()]).toString('hex');
      res.cookie('token', encrypted, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
      });
      res.status(200);
      res.json({ message: 'auth succsess', id: results[0].id, username: results[0].username });
    } else {
      res.status(400);
      res.json({ message: 'Password incorrect' });
    }
  });
}

async function logout(req, res) {
  res.status(200);
  res.clearCookie('token');
  res.json('successful logout');
}

async function updateUser(req, res) {
  const email = req.body.email || 'NULL';
  const phone = req.body.phone || 'NULL';
  const link = req.body.link || 'NULL';
  const gender = req.body.gender || 'NULL';
  const { userInfo } = req;

  connection.query(`UPDATE user SET email = '${email}', phone = '${phone}', link = '${link}', gender='${gender}'
  where id = '${userInfo.id}'`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results);
    }
  });
}

async function changePassword(req, res) {
  const { userInfo } = req;
  const { newPassword } = req.body;

  const passwordHash = sha256(newPassword);

  connection.query(`UPDATE user SET password = '${passwordHash}'
  where id = '${userInfo.id}'`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
      const tokenJson = {
        username: userInfo.username,
        password: newPassword,
      };
      const tokenString = JSON.stringify(tokenJson);
      const encrypted = Buffer.concat([cipher.update(tokenString), cipher.final()]).toString('hex');
      res.cookie('token', encrypted, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
      });
      res.json(results);
    }
  });
}

async function deleteUser(req, res) {
  const { userInfo } = req;
  connection.query(`DELETE FROM user where id = '${userInfo.id}'`,
    (error, results) => {
      if (error) {
        res.status(400);
        res.json({ error });
      } else {
        res.status(200);
        res.clearCookie('token');
        res.json(results);
      }
    });
}

async function getUserInfo(req, res) {
  const { username } = req.params;
  connection.query(`select * from user where username = '${username}'`,
    (error, results) => {
      if (error) {
        res.status(400);
        res.json({ error });
      } else if (results.length === 0) {
        res.status(404);
        res.json({ message: 'no such user' });
      } else {
        res.status(200);
        res.json(results[0]);
      }
    });
}

async function createGroup(req, res) {
  const userId = req.userInfo.id;

  const { name, type } = req.body;
  const groupId = uuid.v4();
  const typeBool = type === 'public';

  connection.query(`INSERT INTO groupInfo(id, name, type)
    values ('${groupId}', '${name}', ${typeBool});`, (error) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409);
        res.json({ message: error.sqlMessage });
      } else {
        res.status(400);
        res.json({ error });
      }
    } else {
      connection.query(`INSERT INTO admin(userId, groupId)
          values ('${userId}', '${groupId}');`, (error2) => {
        if (error2) {
          res.status(400);
          res.json({ error2 });
        } else {
          connection.query(`INSERT INTO member(userId, groupId)
                values ('${userId}', '${groupId}');`, (error3) => {
            if (error3) {
              res.status(400);
              res.json({ error3 });
            } else {
              const { tag } = req.body;
              let q = 'INSERT INTO tagRelation(groupId, tagId) values ';
              for (let i = 0; i < tag.length - 1; i += 1) {
                q = q.concat(`('${groupId}', '${tag[i]}'), `);
              }
              q = q.concat(`('${groupId}', '${tag[tag.length - 1]}');`);
              connection.query(q, (error4) => {
                if (error4) {
                  res.status(400);
                  res.json({ error4 });
                } else {
                  res.status(200);
                  res.json({ id: groupId, name, type });
                }
              });
            }
          });
        }
      });
    }
  });
}

async function getPublicGroups(req, res) {
  connection.query(`SELECT groupInfo.id, groupInfo.name, groupInfo.type,
  max(p.datetime) as latest, count(p.id) as num_posts, count(m.userId) as num_members
from groupInfo left join post p on groupInfo.id = p.groupId
left join member m on groupInfo.id = m.groupId
where groupInfo.type = true
group by groupInfo.id;`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results);
    }
  });
}

async function getTags(req, res) {
  connection.query('SELECT * from tag', (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results);
    }
  });
}

async function createTag(req, res) {
  const { name } = req.body;
  if (name) {
    const tagId = uuid.v4();

    connection.query(`INSERT INTO tag(id, name)
      values ('${tagId}', '${name}');`, (error) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(409);
          res.json({ message: error.sqlMessage });
        } else {
          res.status(400);
          res.json({ error });
        }
      } else {
        res.status(200);
        res.json({ id: tagId, name });
      }
    });
  }
}

async function createPost(req, res) {
  const userId = req.userInfo.id;
  const { title, postContent, attachmentType } = req.body;
  const attachment = req.body.attachment ? `'${req.body.attachment}''` : 'NULL';

  const postId = uuid.v4();

  _getGroup(req, res, (group) => {
    connection.query(`INSERT INTO post(id, title, author, groupId, postContent, attachment, attachmentType, datetime)
        values ('${postId}', '${title}', '${userId}', '${group.id}', '${postContent}',
        ${attachment}, '${attachmentType}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}');`, (error) => {
      if (error) {
        res.status(400);
        res.json({ error });
      } else {
        res.status(200);
        res.json({ id: postId });
      }
    });
  });
}

async function flagPost(req, res) {
  const { postId } = req.params;
  const userId = req.userInfo.id;

  connection.query(`UPDATE post SET flagger = '${userId}'
  where id = '${postId}';`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results);
    }
  });
}

async function deletePost(req, res) {
  const { postId } = req.params;
  connection.query(`UPDATE post SET deleted = true where id = '${postId}'`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results);
    }
  });
}

async function hidePost(req, res) {
  const { postId } = req.params;
  const userId = req.userInfo.id;
  connection.query(`INSERT INTO hide(postId, userId)
      values ('${postId}', '${userId}');`, (error) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409);
        res.json({ message: error.sqlMessage });
      } else {
        res.status(400);
        res.json({ error });
      }
    } else {
      res.status(200);
      res.json({ postId, userId });
    }
  });
}

async function getHidePost(req, res) {
  const userId = req.userInfo.id;
  connection.query(`SELECT postId from hide where userId = '${userId}';`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results);
    }
  });
}

async function deleteComment(req, res) {
  const { commentId } = req.params;
  const userId = req.userInfo.id;
  connection.query(`UPDATE comment SET deleted = true where id = '${commentId}' and author = '${userId}';`,
    (error, results) => {
      if (error) {
        res.status(400);
        res.json({ error });
      } else {
        res.status(200);
        res.json(results);
      }
    });
}

async function groupRecommendation(req, res) {
  const userId = req.userInfo.id;
  connection.query(`select * from groupInfo g where g.id not in
  (select g.id from groupInfo g join member m on g.id = m.groupId where m.userId = '${userId}')
  and g.type = true LIMIT 10;`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results);
    }
  });
}

async function groupAnalytic(req, res) {
  const { groupId } = req.params;
  connection.query(`select t1.id, num_member, num_post, num_deleted, num_flagged, t3.num_hidden from (select g.id, count(m.userId) as num_member from groupInfo g
  join member m on g.id = m.groupId where g.id = '${groupId}') t1,
            (select g.id, count(p.id) as num_post, COALESCE(sum(p.deleted = true),0) as num_deleted, COALESCE(sum(p.flagger IS NOT NULL),0) as num_flagged
            from groupInfo g join post p on g.id = p.groupId where g.id = '${groupId}') t2,
(select g.id, count(*) as num_hidden from groupInfo g join post p on g.id = p.groupId join hide h on p.id = h.postId where g.id = '${groupId}') t3;`, (error, results) => {
    if (error) {
      res.status(400);
      res.json({ error });
    } else {
      res.status(200);
      res.json(results[0]);
    }
  });
}

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

function _checkAdmin(req, res, callback) {
  _getGroup(req, res, (group) => {
    connection.query(`SELECT * FROM admin WHERE userId = '${req.userInfo.id}' AND groupId = '${group.id}';`, (error, results) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        callback(group, results.length > 0);
      }
    });
  })
};

function getGroups(req, res) {
  connection.query(`SELECT groupInfo.* FROM groupInfo INNER JOIN member ON groupInfo.id = member.groupId WHERE member.userId = '${req.userInfo.id}';`, (error0, results0) => {
    connection.query(`SELECT * FROM groupInfo
    WHERE NOT EXISTS (SELECT * FROM member WHERE userId = '${req.userInfo.id}' AND groupId = groupInfo.id) AND type = 1;`, (error1, results1) => {
      res.status(200).json({ joined: results0, public: results1 });
    });
  });
}

function resolveRequest(req, res) {
  _checkAdmin(req, res, (group, isAdmin) => {
    if (!isAdmin) {
      res.status(403).json('admin permission needed');
    } else {
      const promise0 = req.body.granted ? dbQuery(`INSERT INTO member(userId, groupId) SELECT user.id, '${group.id}' FROM user WHERE username = '${req.params.username}';`) : Promise.resolve();
      const promise1 = dbQuery(`DELETE request FROM request INNER JOIN user on request.userId = user.id WHERE user.username = '${req.params.username}' and request.groupId = '${group.id}';`);
      return Promise.all([promise0, promise1]).then(() => {
        res.status(201).json('success');
      }).catch((error) => {
        res.status(400).json({ error });
      })
    }
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

function postRequest(req, res) {
  _getGroup(req, res, (group) => {
    const promise0 = dbQuery(`INSERT INTO request(userId, groupId) VALUES ('${req.userInfo.id}', '${group.id}');`);
    const promise1 = dbQuery(`DELETE from invitation WHERE invitation.userId = '${req.userInfo.id}' AND invitation.groupId = '${group.id}';`);
    return Promise.all([promise0, promise1]).then(() => {
      res.status(201).json('success');
    }).catch((error) => {
      res.status(400).json({ error });
    });
  });
}

function postInvitation(req, res) {
  _getGroup(req, res, (group) => {
    const promise0 = dbQuery(`SELECT * FROM member INNER JOIN user ON member.userId = user.id WHERE user.username = '${req.params.username}' AND member.groupId = '${group.id}';`);
    const promise1 = dbQuery(`SELECT * FROM request INNER JOIN user ON request.userId = user.id WHERE user.username = '${req.params.username}' AND request.groupId = '${group.id}';`);
    return Promise.all([promise0, promise1]).then(([results0, results1]) => {
      if (results0.length > 0 || results1.length > 0) {
        return Promise.reject(new Error('invitee is already a member of the group or has already sent an request to join group'));
      }
    }).then(() => dbQuery(`INSERT INTO invitation(userId, groupId) SELECT user.id, '${group.id}' FROM user WHERE username = '${req.params.username}';`)).then(() => {
      res.status(201).json('success');
    }).catch((error) => {
      res.status(200).json({ error });
    });
  });
}

function getInvitations(req, res) {
  connection.query(`SELECT groupInfo.* FROM groupInfo INNER JOIN invitation ON groupInfo.id = invitation.groupId WHERE invitation.userId = '${req.userInfo.id}';`, (error, results) => {
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(200).json(results);
    }
  });
}

function leaveGroup(req, res) {
  _getGroup(req, res, (group) => {
    connection.query(`DELETE FROM admin WHERE userId = '${req.userInfo.id}' and groupId = '${group.id}';`, (error0) => {
      if (error0) {
        res.status(400).json({ error: error0 });
      } else {
        connection.query(`DELETE FROM member WHERE userId = '${req.userInfo.id}' and groupId = '${group.id}';`, (error1, results1) => {
          if (error1) {
            res.status(400).json({ error: error1 });
          } else {
            res.status(200).json('success');
          }
        });
      }
    })
  });
}

function getGroup(req, res) {
  _checkAdmin(req, res, (group, isAdmin) => {
    const promise0 = dbQuery(`SELECT user.* FROM user INNER JOIN member ON member.userId = user.id WHERE member.groupId = '${group.id}';`);
    const promise1 = dbQuery(`SELECT user.* FROM user INNER JOIN admin ON admin.userId = user.id WHERE admin.groupId = '${group.id}';`);
    const promise2 = dbQuery(`SELECT * FROM post WHERE groupId = '${group.id}';`).then(async (posts) => {
      await Promise.all(posts.map(async (post) => {
        await dbQuery(`SELECT * FROM comment WHERE postId = '${post.id}' ORDER BY datetime DESC;`);
      }));
      return posts;
    });
    const promise3 = isAdmin ? dbQuery(`SELECT user.* FROM user INNER JOIN request ON request.userId = user.id WHERE request.groupId = '${group.id}'`) : Promise.resolve(undefined);
    return Promise.all([promise0, promise1, promise2, promise3]).then(([members, admins, posts, requests]) => {
      group.members = members;
      group.admins = admins;
      group.posts = posts;
      group.requests = requests;
      res.status(200).json(group);
    }).catch((error) => {
      res.status(400).json({ error });
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
  createUser,
  loginUser,
  checkCookie,
  getUserInfo,
  changePassword,
  deleteUser,
  updateUser,
  createGroup,
  createTag,
  logout,
  getPublicGroups,
  getTags,
  createPost,
  flagPost,
  deletePost,
  hidePost,
  getHidePost,
  deleteComment,
  groupRecommendation,
  groupAnalytic,
  getGroups,
  resolveRequest,
  leaveGroup,
  addAdmin,
  deleteAdmin,
  postRequest,
  postInvitation,
  getInvitations,
  getGroup,
  postComment,
  getMessages,
  postMessage,
};
