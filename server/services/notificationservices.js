// notificationService.js
const WebSocket = require('ws'); // If using WebSockets

exports.sendIncomingCallNotification = (recipientUserId, callData) => {
    try {
        // Create a JSON object containing the notification details
        const notification = {
          type: 'incoming-call',
          data: callData, // Include call-related data (e.g., caller information)
        };
    
        // Send the notification to the recipient user via WebSocket
        recipientSocket.send(JSON.stringify(notification));
      } catch (error) {
        console.error('Error sending incoming call notification:', error);
      }
    };


    exports.sendMissedCallNotification = (callerSocket, missedCallData) => {
        try {
          // Create a JSON object containing the notification details
          const notification = {
            type: 'missed-call',
            data: missedCallData, // Include missed call-related data (e.g., recipient information)
          };
      
          // Send the notification to the caller user via WebSocket
          callerSocket.send(JSON.stringify(notification));
        } catch (error) {
          console.error('Error sending missed call notification:', error);
        }
      };

exports.sendCallRequestNotification = (recipientUserId, callRequestData) => {
    try {
        // Create a JSON object containing the notification details
        const notification = {
          type: 'call-request',
          data: callRequestData, // Include call request-related data (e.g., caller information)
        };
    
        // Send the notification to the recipient user via WebSocket
        recipientSocket.send(JSON.stringify(notification));
      } catch (error) {
        console.error('Error sending call request notification:', error);
      }
    
};
