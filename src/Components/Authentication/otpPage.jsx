

import Navbar from "./Navbar";
import { useLocation,useParams,useNavigate } from "react-router-dom";
import Otp from "./otpScreen";

export default function OtpPage() {
    
  const { username, email } =useParams();

  return (
    <div className="loginContainer">
      <div className="tryi">
        <Navbar />
        <Otp username={username} email={email} />
      </div>
    </div>
  );
}
