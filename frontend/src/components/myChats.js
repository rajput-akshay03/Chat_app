import { useContext, useEffect, useState } from "react";
import { Chatcontext } from "../context/ChatProvider";
import { FaPlus } from 'react-icons/fa';
import axios from "axios";
import "./css/mychat.css"
const MyChats = ()=>{
    // const user = chatState();
    const {user,chats,setChats,selectedChat,setSelectedChat} = useContext(Chatcontext);
    
   const [data,setdata]= useState()
    const fetchChats = async()=>{
        
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
                setChats(data);
                setdata(data);
               
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
             <div className="mychat-header">
                 <div>My Chats</div>
                 <button className="groupbtn">New Group Chat <FaPlus/></button>
             </div>
             <div className="main-mychat">
              { 
               data==null?null:
                  
                      data.result.map((chatdata)=>(
                      
                         <div className="mychat" key={chatdata.id} onClick={()=>{setSelectedChat(chatdata)}}>
                            <div className="cht">{chatdata.isGroupChat==true?chatdata.chatName:chatdata.users[1].name}</div>
                            <div className="chtlst"> {chatdata.latestMessage.content}</div>
                            
                            </div>
                  ))
                  
                }
             </div>
        </div>
    )
}
export default MyChats;