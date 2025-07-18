const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User endpoint is working!');
});

module.exports = router; // THIS IS CRITICAL
