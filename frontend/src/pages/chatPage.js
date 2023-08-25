// import {ChatState} from "../context/ChatProvider";
import SideBar from "../components/sideBar";
import MyChats from "../components/myChats";
import ChatBox from "../components/chatBox";
import "./css/chat.css"
const ChatPage  = ()=>{
    // const {user} = ChatState();
    return(
        <div className="miii">
             <SideBar/>
             <div className="inner-div">
             <MyChats/>
             <ChatBox/>
             </div>
        </div>
    );
}
export default ChatPage;