const db = require('../../db');
const { setupDB, resetDB, cleanupDB } = require('../setup');

describe('Database Operations (Non-mocked)', () => {
  beforeAll(async () => {
    await setupDB();
  });

  afterAll(async () => {
    await cleanupDB();
  });

  beforeEach(async () => {
    await resetDB();
  });

  test('should insert and retrieve task', async () => {
    const [insertResult] = await db.query(
      'INSERT INTO tasks (title) VALUES (?)',
      ['Test Task']
    );

    const [tasks] = await db.query('SELECT * FROM tasks');
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  test('should return expected task from SQL script', async () => {
    await db.query(
      'INSERT INTO tasks (title, completed) VALUES (?, ?)',
      ['Scripted Task', true]
    );

    const [tasks] = await db.query('SELECT * FROM tasks WHERE completed = ?', [true]);
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Scripted Task');
    expect(tasks[0].completed).toBe(1);
  });
});
