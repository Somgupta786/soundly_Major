import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyApi } from "../../Api/auth";
import axios from "axios";
export default function Resend(props){
    props.setShowResend(false);
    console.log("hello")
    toast("OTP SENT!");
    if(props.id==1){
        if(props.isEmail){
            const response = axios.post("https://test-mkcw.onrender.com/api/user/register/email/", {
        username: props.username,
        email: props.email
      });
        }
        else{
            const response = axios.post("https://test-mkcw.onrender.com/api/user/register/phone/", {
        username: props.username,
      phone_number: props.email
      });

        }
           
    }
    else{
        const response =  axios.post(verifyApi, {
            username: props.username, });
    }
    
    return(
        <ToastContainer />
    )    
   
}