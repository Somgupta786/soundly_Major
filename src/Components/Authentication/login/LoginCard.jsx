import { useState } from "react";
import Logo from "../LogoIcon"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";
import { verifyApi } from "../../../Api/auth";
export default function LoginCard(){
   
   const Navigation = useNavigate();
   const [isClicked, setClicker] = useState(false);
   const [isLoad, setLoad] = useState(false);
   const [inputs, setInputs] = useState({
      username: ''
    });
    const forgetHandler =() =>{
      Navigation("/forget")
    }
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
      setClicker(false)
    };
    const [error, setError] = useState();
   const continueHandler = async (e) => {
      setLoad(true)
      e.preventDefault();
    
      try {
        const response = await axios.post(verifyApi, {
          username: inputs.username, });
        
          setLoad(false);
        
        console.log(response.data);
    
      
        setError(response.data);
    
        
        if (response.data.success) {
         
          Navigation("/Otp",{state:{username:inputs.username,id:2}});
        } else {
          setClicker(true);
          setLoad(false);
        }
      } catch (error) {
        console.log(error.response)
         setLoad(false);
         setClicker(true);
       
        if (error.response) {
         setError(error.response.data);
        } else {
          console.log(error)
          
          setLoad(false);
        }
      }
    };
    
return(
    
<div className="mainContent"> 
 <div className="loginCard">
    <div >
    <form className="loginFrame" id="login" onSubmit={continueHandler}>
       <div className="welcome">
       <div className="welcomeText">Welcome to</div>
       <div className="try"><Logo /></div>
        </div>
        <div className="loginText">
        Login to have an access to millions of songs 
        </div>
        <div className="label">
            <input type="text" 
            className="loginField"
             placeholder="Username" 
             name="username"
             onChange={handleInputChange}
             value={inputs.username}
              />
            <div className="emailText">Username</div>
            <div className="forgetText" onClick={forgetHandler}>
        Forgot Username?
        </div>
        </div>
        
        
  {isClicked && error ? <div className="errorMsg">{error.message}</div> : null}
   
  
        
       
       <div className="submitLogin">
              <button type="submit" className="continueButton" >{isLoad ?<div className="loader"></div> :"Continue"}</button>
            </div>
          </form>  
    </div>
 </div>


</div>



);


}