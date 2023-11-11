
import React, { createContext, useState } from 'react'
// import './index.css'
import { ToastContainer } from 'react-toastify';
import Playback from './Components/Home_Page/playBack';
import Navbar from "./Components/Home_Page/Navbar";


import AppRouter from './AppRouter';
export const playBackContext=createContext();

function App() {
  const[playBackData,setPlayBackData]=useState({})
  const[navData,setNavData]=useState({
    home:"Home",
    library:"Library",
    game:"Game"

  })
  localStorage.setItem("authTok",JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxODA1MTczLCJpYXQiOjE2OTkyMTMxNzMsImp0aSI6IjYwOTdkYTkxNTJmMDQ1YzY4YmE1MTBjZWQyMDM4MzAxIiwidXNlcl9pZCI6ImFkbWluIn0.zhhXZrQzl4fls2jh26tGQ6KMuKojlFV8r-rE1LEWT_w"))
  const[isHome,setHome]=useState(false)

  
  return(
    <playBackContext.Provider value={{setPlayBackData,setNavData,setHome}} >
    <ToastContainer/>
    <AppRouter />
    {isHome?<Playback playBackData={playBackData}/>: null}
    {isHome?<Navbar navData={navData}/>: null}
    
    

    </playBackContext.Provider>

  );

}

export default App