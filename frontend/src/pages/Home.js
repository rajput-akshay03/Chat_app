import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "./css/home.css";
function HomePage(){
      const [temp,setTemp] = useState(0);
     const clickhandler1=()=>{
        setTemp(0);
      }
    const clickhandler2=()=>{
        setTemp(1);
      }
     
    return(
        <div className="main_div">
            <div className="header">Chat-Up</div>
            <div className="base">
                <div className="button">
                    <button className="buttons" onClick={clickhandler1} id={temp===0?"btnn":null}>Login</button>
                    <button className="buttons" onClick={clickhandler2}  id={temp===1?"btnn":null}>Signup</button>
                </div>
                <div>
                    {temp===0?<Login/>:<Signup/>}
                </div>
                <div></div>
               
            </div>
        </div>
    );
}
export default HomePage;