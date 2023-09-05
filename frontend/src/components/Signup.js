import React, { useState } from "react";
import {toast,ToastContainer} from 'react-toastify';
import {useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import './css/Login.css'
function Signup(){
    const navigate = useNavigate();
    
    const [formdata,setdata] = useState({name:"",email:"",password:"",confirm_password:"",picture:""})
      const inputhandle= (e)=>{ 
            setdata(values=>({...values , [e.target.name]: e.target.value}));
      }
      const handleSubmit=async(e)=>{
        
        if(!formdata.name || !formdata.email || !formdata.password || !formdata.confirm_password)
        {
            console.log("please fill all details");
            toast("fill all details");
            e.preventDefault();
            
            return ;
        }
        if(formdata.password!==formdata.confirm_password)
        {
            toast("password and confirm password not same")
            e.preventDefault();
            return;
        }
        else{
            const config = {
                headers : {
                    "Content-type":"application/json",
                },
            }         
        const name = formdata.name;
        const email = formdata.email;
        const password = formdata.password;
        const pic = formdata.pic;
            const {data} = await axios.post("http://localhost:4000/api/user",{name,email,password,pic},config);
          localStorage.setItem("userInfo",JSON.stringify(data));
          toast("signup successfully")
          navigate("/chats");
        } 
      }  
    return(
        <div>
            <form action="" className="form"  onSubmit={handleSubmit}>
                <div  className="inputs">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="input" onChange={inputhandle} name="name"/>
                </div>
                <div  className="inputs">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="input" onChange={inputhandle} name="email"/>
                </div>
                <div  className="inputs">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="input" onChange={inputhandle} name="password"/>
                </div>
                <div  className="inputs">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password" className="input" onChange={inputhandle} name="confirm_password"/>
                </div>
                <div className="inputs">
                    <label htmlFor="file">Upload Your Picture</label>
                    <input type="file" id="file" className="input" onChange={inputhandle} name="picture"/>
                </div>
                <button className="btn" id="btn2">Signup</button>
                <ToastContainer/>
            </form>
        </div>
    )
}
export default Signup;