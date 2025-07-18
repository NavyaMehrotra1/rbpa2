const express = require('express');
const router = express.Router();

// GET all tasks
router.get('/', (req, res) => {
  res.json({ message: 'Get all tasks' });
});

// POST a new task
router.post('/', (req, res) => {
  res.json({ message: 'Create a new task' });
});

// PUT (update) a task by ID
router.put('/:id', (req, res) => {
  res.json({ message: `Update task with ID ${req.params.id}` });
});

// DELETE a task by ID
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete task with ID ${req.params.id}` });
});

module.exports = router; 