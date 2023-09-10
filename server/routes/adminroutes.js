const express = require('express');
const router = express.Router();
const {getCallLogs,getRealTimeTracking}=require("../Controller/AdminController");
// Middleware to check if the user is an admin
  
  // Apply the isAdmin middleware to admin routes
router.get('/call-logs', isAdmin, getCallLogs);
router.get('/real-time-tracking', isAdmin,getRealTimeTracking);
  
module.exports = router;