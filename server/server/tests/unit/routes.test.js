const request = require('supertest');
const app = require('../../app'); // your Express app
const db = require('../../db');

// Mock response
const mockTasks = [
  { id: 1, title: 'Sample', completed: false }
];

// Mock db.query
jest.mock('../../db', () => ({
  query: jest.fn()
}));

describe('Routes Unit Tests (Mocked DB)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/tasks handles validation', async () => {
    const response = await request(app).post('/api/tasks').send({}); // invalid payload
    expect(response.status).toBe(400);
   expect(response.body).toEqual({ error: 'Title is required' });

  });

  test('GET /api/tasks returns tasks', async () => {
    db.query.mockResolvedValue([mockTasks]);
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTasks);
  });
});
