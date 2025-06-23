const db = require('../../db');
const { setupDB, cleanupDB, resetDB } = require('../setup');
const sinon = require('sinon');
sinon.stub(db, 'query').resolves([mockData]);

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
});
const db = require('../../db');
await db.query('test_db.sql', params);
expect(response.body).toEqual(mockTasks[0]);
