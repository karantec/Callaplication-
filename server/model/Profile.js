const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type:String,
    required: true,// Ensure only one profile per user
  },
  fullName: {
    type: String,
    required: true,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  callPreferences: {
    notificationSettings: {
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
    },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'Busy', 'Away', 'Offline'],
      default: 'Available',
    },
    // Add more preferences as needed
  },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
