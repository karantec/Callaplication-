// notificationRoutes.js
const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');

router.post('/sendIncomingCallNotification', notificationController.sendIncomingCallNotification);
router.post('/sendMissedCallNotification', notificationController.sendMissedCallNotification);
router.post('/sendCallRequestNotification', notificationController.sendCallRequestNotification);

module.exports = router;
