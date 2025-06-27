const request = require('supertest');
const sinon = require('sinon');
const db = require('../../db');
const app = require('../../app');

const mockTasks = [{ id: 1, title: 'Mocked Task' }];

describe('Routes Unit Tests (Mocked DB)', () => {
  afterEach(() => {
    sinon.restore();
  });

  test('GET /api/tasks returns tasks', async () => {
    sinon.stub(db, 'query').resolves([mockTasks]);
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
  });

  test('POST /api/tasks handles validation', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Title is required');
  });
  beforeAll(async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
});

});
