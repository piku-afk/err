const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Acharya1234',
  database: 'pharmacy'
});

module.exports = connection;