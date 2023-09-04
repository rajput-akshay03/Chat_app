import { useState } from "react";
import "./css/groupModel.css"
const NewGroup = ()=>{
        const [groupChatName,setGroupChatName] = useState();
        const [groupUsers,setGroupUsers] = useState([]);
       return (
        <div className="group">
               <div>
                 Create Group Chat
               </div>
               <input type="text" placeholder="Chat Name"/>
        </div>
        )
}
export default NewGroup;