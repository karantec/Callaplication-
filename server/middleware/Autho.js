//auth isStudent isAdmin

const jwt=require("jsonwebtoken");

require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
        //extract jwt token
        const token=req.body.token|| req.cookie.token|| req.header("Authorization").replace("Bearer ","");
        if(!token|| token===undefined){
            return res.status(401).json({
                message:"Token Missing",
            })
        }
        //verify token
        try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
    
        }catch(error){
            res.status(501).json({
                success:false,
                message:"TOken is invalid"
            });
    
        }
        next();
    }
        catch(error){
            res.status(501).json({
                success:false,
                message:"Something went wrong"
            });
        }
    
}
exports.isUser=async(req,res,next)=>{
    try{
        if(req.user.role!=="user"){
        return res.status(401).json({
            message:"Access denied"
        })
    }
    next();
}
catch(error){
    res.status(501).json({
        success:false,
        message:"Something went wrong",
    });
}
}
exports.isAdmin=async(req,res,next)=>{
    try{
    if(req.user.role && req.user.role ==="Admin"){
        return res.status(401).json({
            message:"Access denied"
        })
    }
    next();
}
catch(error){
    res.status(501).json({
        success:false,
        message:"Something went wrong"
    });
}
}


     

