const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  
  points: { type: Number, required: true, default: 0 },
  email: { type: String },
  password: { type: String },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }],
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;