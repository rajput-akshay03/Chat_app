import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

 export const Chatcontext = createContext();
const ChatProvider = ({children})=>{
    const [user,setuser]= useState();
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo);
        if(!userInfo)
        {
            navigate("/")
        }
    },[navigate]);
    return <Chatcontext.Provider value={user}>{children}</Chatcontext.Provider>
};
export default ChatProvider;