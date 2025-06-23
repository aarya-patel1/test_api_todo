const request = require('supertest');
const app = require('../../app');

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
