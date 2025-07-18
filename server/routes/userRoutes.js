const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.get('/', (req, res) => {
  res.send('User endpoint is working!');
});

module.exports = router; 
