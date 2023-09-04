import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

 export const Chatcontext = createContext();
const ChatProvider = ({children})=>{
    const [user,setuser]= useState();
    const [selectedChat,setSelectedChat] = useState();
    const [chats,setChats] = useState();
    const [notifications,setNotifications] = useState([]);

    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo);
        if(!userInfo)
        {
            navigate("/")
        }
    },[navigate]);
    return <Chatcontext.Provider value={{user,setuser,chats,setChats,selectedChat,setSelectedChat,notifications,setNotifications}}>{children}</Chatcontext.Provider>
};
export default ChatProvider;