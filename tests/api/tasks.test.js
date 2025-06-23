const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

describe('Tasks API Tests', () => {
  beforeAll(async () => {
    await db.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, completed BOOLEAN DEFAULT FALSE)');
  });

  afterAll(async () => {
    await db.query('DROP TABLE IF EXISTS tasks');
  });

  beforeEach(async () => {
    await db.query('DELETE FROM tasks');
  });

  test('GET /api/tasks returns 200', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
  });

  test('POST /api/tasks creates task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'API Test' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('API Test');
  });
afterAll(async () => {
  await db.pool.end();
});
});
