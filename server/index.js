const express=require('express');
const app=pexress();
const socketIo = require('socket.io');
require('dotenv').config();
app.use(express.json());

const io = require("socket.io")(server,{
  cors:{
    origin:"http:localhost:8080",
    methods:["GET","POST"]
  }
})

const PORT=process.env.PORT || 5000;

const cookieParser=require("cookie-parser");
app.use(cookieParser());

io.on('connection',(socket)=>{
  socket.emit("me",socket.id);

  
  socket.on("call initiate",({callerId,targetId})=>{
    io.to(targetId).emit("call initiated",{callerId,targerId});
  })
  socket.on("call-accepted",({callerId,targetId})=>{
    io.to(callerId).emit("call-accepted",targetId);
  })
  socket.on("call-rejected",({callerId,targetId})=>{
    io.to(callerId).emit("call-rejected",targetId);
  })
  socket.on("callUser",(data)=>{
    io.to(data.userToCall).emit("callUser",{signal:data.signalData,from:data.from,name:data.name});
  })
  socket.on("answerCall",(data)=>{
  io.to(data.to).emit("callAccepted",data.signal);
})
  socket.on("disconnected",()=>{
  socket.broadcast.emit("callEnded");
    })
  
})


require("./config/database").connect();
const user=require("./routes/user");
const profile=require("./routes/profile");
const calllog=require("./routes/Callllogs");
const admin=require("./routes/admin");
app.use("/api/v1",user);
app.use("/api/v2",profile);
app.use("/api/v3/",calllog);
app.use("/api/v4/",admin);
 
app.listen(PORT,()=>{
  console.log(`Server is created at port 5000,{PORT}`)
});