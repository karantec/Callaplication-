const bcrypt=require("bcrypt");
const User=require("../model/User");
const jwt=require("jsonwebtoken");
require('dotenv').config();
exports.signup=async(req,res)=>{

    try{
        const {name,email,password,role}=req.body;

        //check if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist",
            });
        }
        //secure password
        let hashedpassword;
        try{
            hashedpassword=await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({   
                success:false,
                message:"Error in hashing"
        });
    }
    //CREATE ENTRY FOR USER
    const user=await User.create({
        name,email,password:hashedpassword,role
    })
    return res.status(201).json({
        success:true,
        message:"User created successfully",
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in creating user"
    })
}
}
//Login
exports.login = async (req,res) => {
    try {

        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });

            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:'User Logged in successfully',
            // });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });

    }
}
