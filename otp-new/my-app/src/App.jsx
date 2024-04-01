// App.jsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import OtpInput from './Components/Otp';
import SignUp from './Components/SignUp';
import AccountCreated from './Components/AccountCreated';
import {AuthProvider } from './Components/AuthContext'

const App = () => {
  return (
<AuthProvider>
  <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OtpInput />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/succesful' element={<AccountCreated />} />
        </Routes>
</AuthProvider>
  );
};

export default App;
