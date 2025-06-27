const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
beforeAll(async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false
    )
  `);
});

describe('Tasks API Tests', () => {
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
});
