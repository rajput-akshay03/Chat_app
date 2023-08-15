import React, { useState } from "react";
import './css/Login.css'
function Signup(){
    const [formdata,setdata] = useState({name:"",email:"",password:"",confirm_password:"",picture:""})
      const inputhandle= (e)=>{ 
            setdata(values=>({...values , [e.target.name]: e.target.value}));
           console.log(formdata)
      }
      function handleSubmit(e){
        console.log(formdata);
        e.preventDefault();
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
            </form>
        </div>
    )
}
export default Signup;