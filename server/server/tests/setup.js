const db = require('../db');

async function setupDB() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE
    )
  `);
}

async function resetDB() {
  await db.query('DELETE FROM tasks');
}

async function cleanupDB() {
  await db.query('DROP TABLE IF EXISTS tasks');
  await db.pool.end(); // clean exit
}

module.exports = {
  setupDB,
  resetDB,
  cleanupDB,
};
