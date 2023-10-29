

import Navbar from "./Navbar";
import { useLocation,useParams,useNavigate } from "react-router-dom";
import Otp from "./otpScreen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OtpPage() {
     toast("OTP SENT!");
    
    
  const {state} =useLocation();

  return (
    
    <div className="loginContainer">
     <ToastContainer />
      <div className="tryi">
        <Navbar title=" " />
        {state.id==1?<Otp username={state.username} email={state.email} id={state.id} isEmail={state.isEmail}  />:<Otp username={state.username} id={state.id}/>}
        
      </div>
    </div>
  );
}
