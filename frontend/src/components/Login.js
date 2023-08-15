import React, { useState } from "react";
import './css/Login.css'
function Login(){
    const [formdata,setdata] = useState({email:"",password:""})
      const inputhandle= (e)=>{ 
            setdata(values=>({...values , [e.target.name]: e.target.value}));
      }
      function handleSubmit(e){
        console.log(formdata);
        e.preventDefault();
      }
    return(
        <div className="main">
            <form action="" className="form" onSubmit={handleSubmit}>
                <div className="inputs">
                   <label htmlFor="email">Email</label>
                   <input id="email" type="email" className="input" name="email" onChange={inputhandle}/>
                </div >
                <div className="inputs">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="input" name="password" onChange={inputhandle}/>
                </div>
                <button className="btn" id="btn1" >Login</button>
            </form>
            <button className="btn" id="btn2">Login By Google</button>
        </div>
    )
}
export default Login;