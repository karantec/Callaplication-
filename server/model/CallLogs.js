const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for user identification
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for participants
      required: true,
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
  callQuality: {
    type: Number, // You can define your own metrics here
  },
});

module.exports = mongoose.model('Callog', callLogSchema);
