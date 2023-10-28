import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyApi } from "../../Api/auth";
import axios from "axios";
export default function Resend(props){
    console.log("hello")
    toast("OTP SENT!");
    const response =  axios.post(verifyApi, {
    username: props.username, });
    return(
        <ToastContainer />
    )    
   
}