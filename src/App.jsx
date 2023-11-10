
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