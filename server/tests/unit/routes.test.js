const request = require('supertest');
const sinon = require('sinon');
const db = require('../../db');
const app = require('../../app');

describe('Routes Unit Tests (Mocked DB)', () => {
  afterEach(() => {
    sinon.restore();
  });
// In routes.test.js
test('GET /api/tasks returns tasks', async () => {
  const mockTasks = [{ id: 1, title: 'Mocked Task' }];
  sinon.stub(db, 'query').resolves([mockTasks]); // Return array
  
  const response = await request(app).get('/api/tasks');
  expect(response.body).toEqual(mockTasks); // Now matches array
});


  test('POST /api/tasks handles validation', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual(mockTasks[0]);

  });
});
