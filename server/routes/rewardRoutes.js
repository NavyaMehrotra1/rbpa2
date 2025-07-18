const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward'); 

// GET all rewards
router.get('/', (req, res) => {
  res.json({ message: 'Get all rewards' });
});

// POST a new reward
router.post('/', (req, res) => {
  res.json({ message: 'Create a new reward' });
});

// PUT (update) a reward by ID
router.put('/:id', (req, res) => {
  res.json({ message: `Update reward with ID ${req.params.id}` });
});

// DELETE a reward by ID
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete reward with ID ${req.params.id}` });
});

module.exports = router;
