import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRouter(props) {
  const Navigation = useNavigate();
  const { Component } = props;
 
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        const authTok = JSON.parse(localStorage.getItem('authTok'));
        
  
  
  useEffect(()=>{
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    const authTok = JSON.parse(localStorage.getItem('authTok'));
   
    if(!isLogged){
      Navigation("/login"); 
    }
  });
  
 

  return (
    <>
     {isLogged ? <Component /> :null}
    </>
  );
}
