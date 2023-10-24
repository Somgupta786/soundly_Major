import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
