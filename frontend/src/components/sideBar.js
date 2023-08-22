import { useContext, useEffect, useRef, useState } from "react";
import "./css/sidebar.css";
import { AiOutlineSearch,AiOutlineBell } from 'react-icons/ai';
import {RiArrowDropUpLine,RiArrowDropDownLine} from 'react-icons/ri';
import { Chatcontext } from "../context/ChatProvider";
const SideBar = ()=>{
    const user = useContext(Chatcontext);
    console.log(user)
    var [temp,setTemp] = useState(0);
    function change(){
        if(temp==0)
           setTemp(1);
        else
            setTemp(0);
    }
    const dropdownRef = useRef(null); 
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setTemp(0); // Close the dropdown when clicked outside
        }
      };
    
      useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener("click", handleClickOutside);
        return () => {
          // Clean up the event listener when the component unmounts
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
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
                {/* <img className="image" src={user.pic} alt="error" /> */}
                {
                    temp==0?  <RiArrowDropUpLine onClick={change}/> : <RiArrowDropDownLine onClick={change} />
                }
                {
                    temp==1?
                    <div className="dropdiv" ref={dropdownRef}>
                        <div>Profile</div>
                        <div>Logout</div>
                    </div>:null
                }
             </div>
        </div>
    )
}
export default SideBar;