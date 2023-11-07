import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRouter(props) {
  const Navigation = useNavigate();
  console.log("shyam")
 
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    console.log(isLogged)
  const { Component } = props;
  useEffect(()=>{
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    console.log(isLogged)
    // if(!isLogged){
    //   Navigation("/login"); 
    // }
  });
  
 

  return (
    <>
       <Component /> 
    </>
  );
}
