import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRouter(props) {
  const Navigation = useNavigate();
  
 
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        const authTok = JSON.parse(localStorage.getItem('authTok'));
        
  
  const { Component } = props;
  useEffect(()=>{
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    const authTok = JSON.parse(localStorage.getItem('authTok'));
   
    if(!isLogged&&authTok==""){
      Navigation("/login"); 
    }
  });
  
 

  return (
    <>
     {isLogged&&authTok!=="" ? <Component /> :null}
    </>
  );
}
