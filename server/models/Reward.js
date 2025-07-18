const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  
  title: { type: String, required: true },
  cost: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Reward = mongoose.model('Reward', rewardSchema);
module.exports = Reward;