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
  connection.query('SELECT * FROM users', function(error, results) {
    console.log('results', results);
    if (error) throw error;
    if (results.length === 0) {
      callback(null, { error: 'NoUserFound' });
    } else {
      callback(null, results);
    }
    connection.end();
  });
};
