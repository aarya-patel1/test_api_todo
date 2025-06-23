const db = require('../../db');

describe('Database Operations (Non-mocked)', () => {
  beforeAll(async () => {
    await db.query('CREATE TABLE IF NOT EXISTS test_todos (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255), completed BOOLEAN)');
  });

  afterAll(async () => {
    await db.query('DROP TABLE IF EXISTS test_todos');
    // Don't close pool here - let Jest handle cleanup
  });

  beforeEach(async () => {
    await db.query('DELETE FROM test_todos');
  });

  test('should insert and retrieve todos', async () => {
    await db.query('INSERT INTO test_todos (title, completed) VALUES (?, ?)', ['Test Todo', false]);
    const [todos] = await db.query('SELECT * FROM test_todos');
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('Test Todo');
  });
});
