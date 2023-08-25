import { useContext, useEffect, useState } from "react";
import { Chatcontext } from "../context/ChatProvider";
import axios from "axios";
import './css/message.css'

const MyMessages = ()=>{
    const [messages,setmessage]= useState([]);
    const [newmessage,setnewmessage]= useState();
    const {user,selectedChat,setSelectedChat,chats,setChats} = useContext(Chatcontext);
    function inputmessage(e)
    {
        setnewmessage(e.target.value);
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
           
           setmessage(data)
        }
        catch(err)
        {
              console.log(err)
        }
    }
    useEffect(()=>{fetchmessages()},[selectedChat])
    const sendmessage = async(e)=>
    {     
          if(e.key=="Enter" &&  newmessage)
          {
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
                     console.log(messages)
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
                            messages.map((msg)=>(<div key={msg.id} className={msg.sender._id==user._id?"aks":"aks2"}>{console.log(msg.sender._id)}{msg.content}</div>))
                        }
                     </div>
                </div>
                :
                <div>please select chat</div>
            }
            </div>
             <div className="inputfield">
            <input type="text" placeholder="enter message here" onChange={inputmessage} onKeyDown={sendmessage} />
            </div>
           
           
                   
              
       
        </div>
    )
}
export default MyMessages;