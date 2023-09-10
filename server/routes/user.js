const express=require('express');
const router=express.Router();

const {createProfile,getUserProfile,updateUserProfile}=require("../Controller/Profile")
const {login ,signup}=require("../Controller/Auth");
const {auth,isUser, isAdmin}=require("../middleware/Autho")

router.post("/login",login);
router.post("/signup",signup);

router.post("/createProfile",createProfile);
router.get("/getUserprofile",getUserProfile);
router.put("/:userid",updateUserProfile);
//protected route

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route"

    });
});
router.get("/profile",auth,isUser,(req,res)=>{
    res.json({
    success:true,
    message:"Welcome to protected route for student"
    });
});
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
    success:true,
    message:"Welcome to protected route for student"
    });
});
   
module.exports=router;