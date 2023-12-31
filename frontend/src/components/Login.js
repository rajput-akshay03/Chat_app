import React, { useState } from "react";
import axios from "axios";
import './css/Login.css';
import {toast,ToastContainer} from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Login(){
   const navigate = useNavigate();
    const [formdata,setdata] = useState({email:"",password:""})
      const inputhandle= (e)=>{ 
            setdata(values=>({...values , [e.target.name]: e.target.value}));
      }
      const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formdata);
      if(!formdata.email || !formdata.password)
      {
        toast("fill all details");
      }
      try{
        const config = {
          headers : {
              "Content-type":"application/json",
          },
         };
         const {email,password} = formdata
         const {data} =await axios.post("http://localhost:4000/api/user/login",{email,password},config);
         if(data.message!="user not found")
         {
           toast("login successfull");
           localStorage.setItem("userInfo",JSON.stringify(data));   
           navigate("/chats")
         }
         else{
          console.log(data)
          toast("wrong password");
         }
      } 
      catch(err)
      {
        toast("error occured");
      }
    }

    return(
        <div className="mainly">
          <div>
          <form action="" className="form" onSubmit={handleSubmit}>
                <div className="inputs">
                   <label htmlFor="email">Email</label>
                   <input id="email" type="email" className="input" name="email" onChange={inputhandle}/>
                </div >
                <div className="inputs">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="input" name="password" onChange={inputhandle}/>
                </div>
                <button className="btn" id="btn1"  >Login</button>
                <button className="btn" id="btn2">Login By Google</button>
            </form>
          </div>
            <ToastContainer/>
        </div>
    )
}
export default Login;