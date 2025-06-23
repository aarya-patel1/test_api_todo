const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '11july2011',
  port: 3306, // <-- make sure this matches your Workbench port!
  database: process.env.NODE_ENV === 'test' ? 'test_db' : 'todo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  return pool.query(sql, params);
}

module.exports = { pool, query };
