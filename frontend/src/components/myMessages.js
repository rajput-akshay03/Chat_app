import { useContext, useEffect, useState } from "react";
import { Chatcontext } from "../context/ChatProvider";
import axios from "axios";
import './css/message.css'
import io from "socket.io-client";
import Lottie from "react-lottie"
import animationData from "../animation/animation_llwj21ng.json"
const ENDPOINT = "http://localhost:4000";
var socket,selectChatCompare;
const MyMessages = ()=>{
    const [messages,setmessage]= useState([]);
    const [newmessage,setnewmessage]= useState();
    const {user,selectedChat,setSelectedChat,chats,setChats} = useContext(Chatcontext);
    const [socketConnected,setSocketConnected] = useState(false);
    const [typing,setTyping] = useState(false);
    const [isTyping,setIsTyping] = useState(false);
    const defaultOptions= {
        loop:true,
        autoplay:true,
        animationData:animationData,
        rendererSettings:{
            preserveAspectRatio:"xMidYMid slice"
        }
    }
    useEffect(()=>{
        socket = io(ENDPOINT);
        if(user!=null)
       { socket.emit("setup",user);}
        socket.on("connected",()=>{setSocketConnected(true) ;})
        socket.on("typing",()=>setIsTyping(true))
        socket.on("stop typing",()=>setIsTyping(false))
   },[user])
    function inputmessage(e)
    {
        setnewmessage(e.target.value);
        console.log(e.target.value)
        if(e.target.value=="")
        {   
            socket.emit("stop typing",selectedChat._id);
               setTyping(false)
        }
        if(!socketConnected)
        {  
            return ;
        }
       if(!typing)
       {
           setTyping(true);
           socket.emit("typing",selectedChat._id);
       }
       let lastTypingTime = new Date().getTime();
       var timerLength = 3000;
       setTimeout(()=>{
           var timeNow = new Date().getTime();
           var timeDiff = timeNow - lastTypingTime;
           console.log(timeDiff)
           if(timeDiff>=timerLength&&typing)
           {
             console.log("akshay")
               socket.emit("stop typing",selectedChat._id);
               setTyping(false)
           }
       })
    }
    const fetchmessages = async()=>{
        if(!selectedChat) return;
        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.get(`http://localhost:4000/api/message/${selectedChat._id}`,config);
            setmessage(data);
            socket.emit("join chat",selectedChat._id)
        }
        catch(err)
        {
              console.log(err)
        }
    }
    useEffect(()=>{fetchmessages();
        selectChatCompare= selectedChat;
    }
    ,[selectedChat]);
    useEffect(()=>{
        socket.on("message recieved",(newMessageRecieved)=>{
            if(!selectChatCompare||selectChatCompare._id != newMessageRecieved.chat._id)
            {
                // notifications
               
            }
            else{
                setmessage([...messages,newMessageRecieved])
            }
        })
  
    })
    const sendmessage = async(e)=>
    {     
          if(e.key=="Enter" &&  newmessage)
          {
            {socket.emit("stop typing",selectedChat._id);
              setTyping(false)
        }
               try{
                    const config = {
                        headers:{
                            "Content-Type":"application/json",
                            Authorization:`Bearer ${user.token}`
                        }
                    }
                    const {data} = await axios.post("http://localhost:4000/api/message",
                           {
                               content:newmessage,
                               chatId:selectedChat._id
                            } ,config                
                    )
                     setmessage([...messages,data.message]);
                     socket.emit("newMessage",data);
                     e.target.value=""
               }
               catch(err)
               {
                     console.log(err)
               }
          }
    }
    
    return(
        <div className="msgbox">
            <div className="mess">
            {
                selectedChat!=null?
                <div>
                      <div>
                        {
                            messages.map((msg)=>(<div key={msg.id} className={msg.sender._id==user._id?"aks":"aks2"}>{console.log("hilla")}{msg.content}</div>))
                        }
                     </div>
                </div>
                :
                <div className="selectchat">Please Select Chat !</div>
            }
            </div>
           
             <div className="inputfield">
                {
                isTyping?<div className="lottie">
                    <Lottie 
                     options={defaultOptions}
                    //  width={70}
                    //  height={10}
                    />
                    </div>:null
                }

            
            <input type="text" placeholder="enter message here" onChange={inputmessage} onKeyDown={sendmessage} className="input"/>
            </div>
        </div>
    )
}
export default MyMessages;