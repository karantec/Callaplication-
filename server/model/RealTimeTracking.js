const mongoose = require('mongoose');

// Define the schema for real-time tracking data
const realTimeTrackingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  online: {
    type: Boolean,
    required: true,
  },
  lastActive: {
    type: Date,
    required: true,
  },
});

// Create a model for real-time tracking data
const RealTimeTracking = mongoose.model('RealTimeTracking', realTimeTrackingSchema);

module.exports = RealTimeTracking;
