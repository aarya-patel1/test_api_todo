const db = require('../db');

module.exports = {
  setupDB: async () => {
    await db.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, completed BOOLEAN DEFAULT FALSE)');
  },
  cleanupDB: async () => {
    await db.query('DROP TABLE IF EXISTS tasks');
  },
  resetDB: async () => {
    await db.query('DELETE FROM tasks');
  }
};
