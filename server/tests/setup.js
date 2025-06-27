const db = require('../db');

module.exports = {
  setupDB: async () => {
    // Ensures the 'tasks' table exists for all tests
    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  },
  cleanupDB: async () => {
    // Drops the 'tasks' table after all tests (optional, for a clean slate)
    await db.query('DROP TABLE IF EXISTS tasks');
  },
  resetDB: async () => {
    // Deletes all rows from 'tasks' table before each test
    await db.query('DELETE FROM tasks');
  }
};
