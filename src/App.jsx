
import React, { createContext, useState } from 'react'
// import './index.css'
import { ToastContainer } from 'react-toastify';
import Playback from './Components/Home_Page/playBack';


import AppRouter from './AppRouter';
export const playBackContext=createContext();
function App() {
  const[playBackData,setPlayBackData]=useState(
    // thumbnail:null,
    // url:null,
    // id:null,
    // name:null
  )

  
  return(
    <playBackContext.Provider value={{setPlayBackData}} >
    <ToastContainer/>
    <AppRouter />
    {playBackData?<Playback playBackData={playBackData}/>: null}
    

    </playBackContext.Provider>

  );

}

export default App