const express=require('express');
const router=express.Router();

const {createProfile,getUserProfile,updateUserProfile}=require("../Controller/Profile")

router.post("/createProfile",createProfile);
router.get("/getUserprofile",getUserProfile);
router.put("/:userid",updateUserProfile);

   
module.exports=router;