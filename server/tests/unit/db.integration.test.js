const db = require('../../db');

describe('Database Operations - Real Database', () => {
  beforeAll(async () => {
    // Set up test database
    await db.connect();
    await db.query('CREATE TABLE IF NOT EXISTS test_todos (id INT PRIMARY KEY, title VARCHAR(255), completed BOOLEAN)');
  });

  afterAll(async () => {
    // Clean up test database
    await db.query('DROP TABLE IF EXISTS test_todos');
    await db.disconnect();
  });

  beforeEach(async () => {
    // Clear test data before each test
    await db.query('DELETE FROM test_todos');
  });

  test('should insert and retrieve todos', async () => {
    const newTodo = { title: 'Test Todo', completed: false };
    
    const insertResult = await db.createTodo(newTodo);
    expect(insertResult.insertId).toBeDefined();

    const todos = await db.getAllTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Test Todo');
  });

  test('should update todo status', async () => {
    // Insert test data
    const result = await db.createTodo({ title: 'Test Todo', completed: false });
    const todoId = result.insertId;

    // Update the todo
    await db.updateTodo(todoId, { completed: true });

    // Verify update
    const updatedTodo = await db.getTodoById(todoId);
    expect(updatedTodo.completed).toBe(true);
  });
});
