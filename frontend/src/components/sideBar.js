import { useContext, useEffect, useRef, useState } from "react";
import "./css/sidebar.css";
import { AiOutlineSearch,AiOutlineBell } from 'react-icons/ai';
import {RiArrowDropUpLine,RiArrowDropDownLine} from 'react-icons/ri';
import { Chatcontext } from "../context/ChatProvider";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ProfileModel from "./profilemodel";
const SideBar = ()=>{
  const navigate = useNavigate();
    const {user,chats,selectedChat,setSelectedChat} = useContext(Chatcontext);
    var [temp,setTemp] = useState(0);
    function change(){
        if(temp==0)
        {
          setTemp(1);
        }
        else
            setTemp(0);
    }
    function logout()
    {  
       localStorage.removeItem("userInfo");
       navigate("/");
       console.log("akshay")
    }
    // function profile(){
    //     setprof("user")
    // }
    // const dropdownRef = useRef(null); 
    // const handleClickOutside = (event) => {
    //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //       setTemp(0); // Close the dropdown when clicked outside
    //     }
    //   };
    
      // useEffect(() => {
      //   // Attach the event listener when the component mounts
      //   document.addEventListener("click", handleClickOutside);
      //   return () => {
      //     // Clean up the event listener when the component unmounts
      //     document.removeEventListener("click", handleClickOutside);
      //   };
      // }, []);
      const [drawerclass,setdrawerclass] = useState("side-drawer");
      function slide(){
           if(drawerclass=="side-drawer")
           {
              setdrawerclass("drawerclass")
           }
           else if (drawerclass=="drawerclass"){
              setdrawerclass("xslider")
           }
           else{
            setdrawerclass("drawerclass")
           }
      }
      const [fetchusername,setfetchusername] = useState();
      const [searchresult,setsearchresult]  = useState([]);
      const fetchUser = async(e)=>{
            setfetchusername(e.target.value)
      }
      const searchuser = async()=>{
           if(!fetchusername)
           return ;
          try{
            const config = {
              headers:{
                  Authorization:`Bearer ${user.token}`
              }
           }
           const {data} = await axios.get(`http://localhost:4000/api/user?search=${fetchusername}`,config)
           setsearchresult(data.Users)
          }
          catch(err)
          {
                console.log(err)
          }
      }
      const checkingchat = async(event,id)=>{
        try{
          const config = {
            headers:{
               "Content-type":"application/json",
                Authorization:`Bearer ${user.token}`
            }
         }
           const {data} = await axios.post("http://localhost:4000/api/chat",{userId:id},config)
           setSelectedChat(data);
           console.log(selectedChat)
        }
        catch(err)
        {
           console.log(err)
        }
      } 

    return(
        <div>
        <div className='main'>
             <div className="div1" 
             onClick={slide}
             >
                <div className="a1"><AiOutlineSearch/></div>
                 <div className="a1"><p>Search User</p></div>
             </div>
             <div className="div2">
                 Chat-Talk
             </div>
             <div className="div3">
             <AiOutlineBell/>
             </div>
             <div className="div4" onClick={change}>
                {
                  user==null?null: <img className="image" src={user.pic} alt="error" />
                }
                {
                    temp==1?
                    <div className="dropdiv" >
                        <div className="dropdiv-inner" 
                        // onClick={ProfileModel(user)}
                        >My Profile</div>
                        <div className="dropdiv-inner" onClick={logout}>Logout</div>
                    </div>:null
                }
             </div>
             
        </div>
        <div className={drawerclass}>
             <div>
                 <h2>Search users</h2>
                 <input type="text" onChange={fetchUser} className="inputsearch" placeholder="search user by name"/>
                 <button onClick={searchuser} className="bt">Go</button>
             </div>
             <div className="totalsearcheduser">
              {
                searchresult.map((user)=>(<div key={user._id} onClick={(event)=>checkingchat(event,user._id)} className="searcheduser">
                 <div>{user.name}</div>
                 <div className="emails">Email : {user.email}</div>
                  </div>))
              }
             </div>
          
        </div>
        </div>
        
    )
}
export default SideBar;