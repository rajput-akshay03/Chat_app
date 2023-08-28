import "./css/chatbox.css"
import { useContext, useEffect, useState } from "react";
import { Chatcontext } from "../context/ChatProvider";
import MyMessages from "./myMessages";
import {AiFillEye } from 'react-icons/ai';
import ProfileModel from "./profilemodel";
const ChatBox = ()=>{
    const {selectedChat} = useContext(Chatcontext);
    return(
        <div className="chatbox">
            <div className="chatheader">
                    {
                        selectedChat==null?null:<div>{selectedChat.chatName}</div>
                       
                    }
                     {/* <div className="eye" onClick={ProfileModel(selectedChat)}><AiFillEye/></div> */}
            </div>
                <MyMessages/>
            
        </div>
    )
}
export default ChatBox;