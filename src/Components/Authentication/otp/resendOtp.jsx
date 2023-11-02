import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyApi } from "../../../Api/auth";
import axios from "axios";
import { useContext } from 'react';
import { Context } from './otpScreen';
export default function Resend(props){
   const {setShowResend} = useContext(Context)
   setShowResend(false)

    console.log(props)
    toast("OTP SENT!");
    if(props.props.id===1){
        if(props.props.isEmail.isEmail){
             axios.post("https://test-mkcw.onrender.com/api/user/register/email/", {
        username:props.props.username,
        email: props.props.email
      });
        }
        else{
            axios.post("https://test-mkcw.onrender.com/api/user/register/phone/", {
        username: props.props.username,
      phone_number:props.props.email
      });

        }
           
    }
    else{
        console.log("ccc")
        const response =  axios.post(verifyApi, {
            username: props.props.username, });
    }
    
    return(
        <ToastContainer />
    )    
   
}