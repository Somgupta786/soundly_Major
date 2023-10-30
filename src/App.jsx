
import React from 'react'
// import './index.css'
import { ToastContainer } from 'react-toastify';

import AppRouter from './AppRouter';
function App() {
  return(
    <div className="main" >
    <ToastContainer/>
    <AppRouter />
    {/* <SignUp /> */}
    
    </div>

  );

}

export default App