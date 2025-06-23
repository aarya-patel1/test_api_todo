const request = require('supertest');
const db = require('../../db');
const app = require('../../app');
const { setupDB, cleanupDB, resetDB } = require('../setup');

describe('Task Integration Tests', () => {
  beforeAll(async () => {
    await setupDB();
  });

  afterAll(async () => {
    await cleanupDB();
  });

  beforeEach(async () => {
    await resetDB();
  });

  test('Full CRUD workflow', async () => {
    // Create
    const postResponse = await request(app)
      .post('/api/tasks')
      .send({ title: 'Integration Test' });
    
    expect(postResponse.status).toBe(201);
    const taskId = postResponse.body.id;

    // Read
    const getResponse = await request(app).get('/api/tasks');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.some(t => t.id === taskId)).toBe(true);

    // Update
    const putResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ completed: true });
    
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.completed).toBe(true);

    // Delete
    const deleteResponse = await request(app)
      .delete(`/api/tasks/${taskId}`);
    
    expect(deleteResponse.status).toBe(204);
  });
});
