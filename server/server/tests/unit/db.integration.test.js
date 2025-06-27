const db = require('../../db');
const { setupDB, resetDB, cleanupDB } = require('../setup');

describe('Database Operations - Real Database', () => {
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
    await db.query('INSERT INTO tasks (title, completed) VALUES (?, ?)', ['Test Task', false]);
    const [tasks] = await db.query('SELECT * FROM tasks');
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
    expect(tasks[0].completed).toBe(0);
  });

  test('should update task status', async () => {
    const [insertResult] = await db.query('INSERT INTO tasks (title, completed) VALUES (?, ?)', ['Another Task', false]);
    const taskId = insertResult.insertId;

    await db.query('UPDATE tasks SET completed = ? WHERE id = ?', [true, taskId]);

    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    expect(updated.length).toBe(1);
    expect(updated[0].completed).toBe(1); // BOOLEAN returns 1/0 in MySQL
  });
});
