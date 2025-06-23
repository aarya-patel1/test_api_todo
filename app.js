const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// API Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (err) {
    console.error('GET /api/tasks error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const [result] = await db.query(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description || '']
    );
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(task[0]);
  } catch (err) {
    console.error('POST /api/tasks error:', err);
    res.status(500).json({
      error: 'Failed to add task',
      details: err.message
    });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    await db.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description, completed, id]
    );
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(task[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export app for testing
module.exports = app;

// Start server only if not in test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
