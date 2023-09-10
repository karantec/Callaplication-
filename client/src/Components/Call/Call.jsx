/* eslint-disable react/no-unknown-property */
import {useEffect,useRef,useState} from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import {CopyToClipboard} from "react-copy-to-clipboard";
import PhoneIcon from "@material-ui/icons/Phone"
import IconButton from "@material-ui/core/IconButton"
import AssignmentIcon from "@material-ui/icons/Assignment"
const socket=io.connect("http://localhost:8080");

const Call = () => {
    const [me,setMe]=useState("");
    const [stream,setStream]=useState();
    const [receivingCall,setRecevingCall]=useState(false);
    const [caller,setCaller]=useState("");
    const [callerSignal,setCallerSignal]=useState();
    const [callAccepted,setCallAccepted]=useState(false);
    const [idToCall,setIdToCall]=useState("");
    const [callEnded,setCallEnded]=useState(false);
    const [name,setName]=useState("");
    const  myVider=useRef();
    const  userVideo=useRef();
    const connectionRef=useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((stream)=>{
            setStream(stream);
            myVider.current.srcObject=stream;
        })

    socket.on("me",(id)=>{
        setMe(id);
    })
    socket.on("callUser",(data)=>{
        setRecevingCall(true);
        setCaller(data.from);
        setName(data.name);
        setCallerSignal(data.signal);
    })
},[])
  
    const callUser=(id)=>{
       const peer=new Peer({
        initiator:true,
        trickle:false,
        stream:stream,
       
       })     

       peer.on("signal",(data)=>{
        socket.emit("callUser", {
            userToCall:id,
            signalData:data,
            from:me,
            name:name
        });
       })
       peer.on("stream",(stream)=>{
        userVideo.current.srcObject=stream;
    })
    socket.on("callAccepted",(signal)=>{
        setCallAccepted(true);
        peer.signal(signal);
    })

    connectionRef.current=peer;
    }
    const answerCall=()=>{
        setCallAccepted(true);
        const peer=new Peer({
            initiator:false,
            trickle:false,
            stream:stream,
        })
        peer.on("signal",(data)=>{
            socket.emit("answerCall", {signal:data,to:caller});
        })
         peer.on("stream",(stream)=>{
            userVideo.current.srcObject=stream;
        })
        peer.signal(callerSignal)
            connectionRef.current=peer
    }
    const leaveCall=()=>{
        setCallEnded(true);
        connectionRef.current.destroy()
    
}
return (
    <>
        <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
    <div className="container">
        <div className="video-container">
            <div className="video">
                {stream &&  <video playsInline muted ref={myVider} autoPlay style={{ width: "300px" }} />}
            </div>
            <div className="video">
                {callAccepted && !callEnded ?
                <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
                null}
            </div>
        </div>
        <div className="myId">
            <input
                id="filled-basic"
                label="Name"
                className="bg-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                <button className="bg-red-500" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                    Copy ID
                </button>
            </CopyToClipboard>

            <input 
                id="filled-basic"
                label="ID to call"
                className="bg-dark"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
            />
            <div className="call-button">
                {callAccepted && !callEnded ? (
                    <button className="bg-blue-500" color="secondary" onClick={leaveCall}>
                        End Call
                    </button>
                ) : (
                    <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                        <PhoneIcon fontSize="large" />
                    </IconButton>
                )}
                {idToCall}
            </div>
        </div>
        <div>
            {receivingCall && !callAccepted ? (
                    <div className="caller">
                    <h1 >{name} is calling...</h1>
                    <button className="bg-blue-500" color="primary" onClick={answerCall}>
                        Answer
                    </button>
                </div>
            ) : null}
        </div>
    </div>
    </>
)
}

export default Call;

