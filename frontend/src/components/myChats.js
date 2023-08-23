import { useContext, useEffect, useState } from "react";
import { Chatcontext } from "../context/ChatProvider";
import axios from "axios";
import "./css/mychat.css"
const MyChats = ()=>{
    // const user = chatState();
    const {user,chats,selectedChat,setSelectedChat} = useContext(Chatcontext);
   const [data,setdata]= useState()
    const fetchChats = async()=>{
        console.log(user)
        if(!user)
        {
            console.log("not found user")
            return
        }
        else{
        
            try{
                const config = {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                 }
                const {data} = await axios.get("http://localhost:4000/api/chat",config)
                setdata(data);
                console.log(data.result)
        }
        catch(err)
        {
              console.log(err);
        }
        }
    }
     useEffect(()=>{
         fetchChats();
      },[user])
    return(
        <div className="mains">
             <div>
                 <div>My Chats</div>
                 <div><button>New Group Chat</button></div>
             </div>
             <div className="main-mychat">
              { 
               data==null?null:
                  
                      data.result.map((chatdata)=>(
                      
                         <div className="mychat" key={chatdata.id}>{chatdata.isGroupChat==true?chatdata.chatName:chatdata.users[1].name}</div>
    ))
                  
                }
             </div>
        </div>
    )
}
export default MyChats;