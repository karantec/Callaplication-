const mongoose = require('mongoose');


// notificationController.js
const notificationService = require('../services/notificationService');

exports.sendIncomingCallNotification = (req, res) => {
  // Extract data from the request and call the corresponding function in notificationService
  const { recipientUserId, callData } = req.body;
  notificationService.sendIncomingCallNotification(recipientUserId, callData);
  res.status(200).json({ message: 'Notification sent successfully' });
};
