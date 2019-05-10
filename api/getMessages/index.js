const mysql = require('mysql');

exports.handler = (event, context, callback) => {
  console.log(event);
  const connection = mysql.createConnection({
    host: 'aa1319wojgx62v2.cjbodtdjmmiq.us-east-1.rds.amazonaws.com',
    user: 'simpleChat',
    password: process.env.mysqlPassword,
    database: 'simpleChat'
  });
  connection.connect();
  // TODO make users dynamic
  const email = 'example@example.com';
  const chattingWith = 'email@email.com';

  connection.query(
    `SELECT * FROM chats WHERE (toUser = '${email}' AND fromUser = '${chattingWith}') OR (toUser = '${chattingWith}' AND fromUser = '${email}')`,
    function(error, results) {
      console.log('results', results);
      if (error) throw error;
      if (results.length === 0) {
        callback(null, { error: 'NoUserFound' });
      } else {
        callback(null, results);
      }
      connection.end();
    }
  );
};
