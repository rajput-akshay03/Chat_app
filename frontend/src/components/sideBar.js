import { useContext, useState } from "react";
import "./css/sidebar.css";
import { AiOutlineSearch,AiOutlineBell } from 'react-icons/ai';
import {RiArrowDropUpLine,RiArrowDropDownLine} from 'react-icons/ri';
import { Chatcontext } from "../context/ChatProvider";
const SideBar = ()=>{
    const user = useContext(Chatcontext);
    console.log(user)
    var [temp,settemp] = useState(0);
    function change(){
        if(temp==0)
           settemp(1);
        else
            settemp(0)
    }
    return(
        <div className='main'>
             <div className="div1">
                <AiOutlineSearch/>
                search user
             </div>
             <div className="div2">
               chat-talk
             </div>
             <div className="div3">
              <AiOutlineBell/>
             </div>
             <div className="div4">
                <img className="image" src={user.pic} alt="error" />
                {
                    temp==0?  <RiArrowDropUpLine onClick={change}/> : <RiArrowDropDownLine onClick={change}/>
                }
             </div>
        </div>
    )
}
export default SideBar;