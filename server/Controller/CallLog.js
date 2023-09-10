const mongoose = require('mongoose');
const  CallLog= require('../model/CallLogs');


exports.createCall=async(req,res)=>{
    try{


    const { userId, participants, duration, callQuality } = req.body;

    const newCallLog = new CallLog({
      userId,
      participants,
      duration,
      callQuality,
    });
    
    return res.status(201).json({
        success:true,
        message:"CallLog created successfully",
    });
}
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in creating Profile"
    });
}
}
exports.getUserCallLogs = async (req, res) => {
    try {
      const userId = req.params.userId;
      const callLogs = await CallLog.find({ userId }).populate('participants');
      res.status(200).json(callLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.getCallLogsByTimestamp = async (req, res) => {
    try {
      const { startTimestamp, endTimestamp } = req.query;
      const callLogs = await CallLog.find({
        timestamp: { $gte: startTimestamp, $lte: endTimestamp },
      }).populate('participants');
      res.status(200).json(callLogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
