const mongoose = require('mongoose');

// Define the schema for the call log
const callLogSchema = new mongoose.Schema({
  callId: {
    type: String,
    required: true,
    unique: true,
  },
  callerId: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  durationInSeconds: {
    type: Number,
    required: true,
  },
  callQuality: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor'],
    required: true,
  },
});

// Create a model for the call log
const CallLog = mongoose.model('CallLog', callLogSchema);

module.exports = CallLog;
