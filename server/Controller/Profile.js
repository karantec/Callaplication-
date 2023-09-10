const mongoose = require('mongoose');
const UserProfile = require('../model/Profile');


exports.createProfile=async(req,res)=>{
        
    try{
        const {user,fullName,email}=req.body;

        //check if user already exist
        const existingUser=await UserProfile.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Profile already exist",
            });
        }
        
        const Profile=await UserProfile.create({
            user,fullName,contactInfo:{email}
        })
        return res.status(201).json({
            success:true,
            message:"Profile created successfully",
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

exports.getUserProfile = async (req, res) => {
    try {
     const {email,}=req.body;
      
      let user = await UserProfile.find({email});// Exclude password field
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.updateUserProfile = async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedProfileData = req.body; // Assuming you send the updated profile data in the request body
  
      const updatedUser = await UserProfile.findByIdAndUpdate(userId, updatedProfileData, {
        new: true, // Return the updated document
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  


