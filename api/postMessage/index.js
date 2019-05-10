const mysql = require('mysql');

exports.handler = (event, context, callback) => {
  const connection = mysql.createConnection({
    host: 'aa1319wojgx62v2.cjbodtdjmmiq.us-east-1.rds.amazonaws.com',
    user: 'simpleChat',
    password: process.env.mysqlPassword,
    database: 'simpleChat'
  });
  connection.connect();
  const { message, email, chattingWith } = event;

  connection.query(
    `INSERT INTO chats (toUser, fromUser, message) VALUES ('${chattingWith}', '${email}', '${message}')`,
    function(error, results) {
      if (error) throw error;
      callback(null, results);
      connection.end();
    }
  );
};
