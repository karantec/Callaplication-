const express=require('express');
const router=express.Router();

const {createCalllog,getUserCallLogs,getCallLogsByTimestamp}=require("../Controller/Profile")

router.post("/createCall",createCalllog);
router.get('/user/:userId', getUserCallLogs);
router.get('/timestamp', getCallLogsByTimestamp);


   
module.exports=router;