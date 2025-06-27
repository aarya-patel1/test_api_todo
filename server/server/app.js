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
// Example PUT /api/tasks/:id
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description, completed, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const [updatedTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updatedTask[0]);
  } catch (err) {
    console.error('PUT /api/tasks/:id error:', err);
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add at the bottom
module.exports = app;

// Modify server start
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

