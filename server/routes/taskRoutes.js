const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('user', 'email'); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new task
router.post('/', async(req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      points: req.body.points,
      user: req.body.userId // Assuming userId is passed in the request body
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT (update) a task by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 