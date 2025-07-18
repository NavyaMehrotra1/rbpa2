const express = require('express');
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes.js'); might need later when adding account management
const taskRoutes = require('./routes/taskRoutes.js');
const rewardRoutes = require('./routes/rewardRoutes.js');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/rewards', rewardRoutes);

module.exports = app;