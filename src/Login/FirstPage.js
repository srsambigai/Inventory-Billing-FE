import React,{useContext} from 'react';
import Login from './Login';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateUser from './CreateUser';
import ForgotPassword from './ForgotPassword';
import AuthContext from '../context/AuthProvider';
import Entry from './Entry';
import ResetPassword1 from './ResetPassword1.js';
function FirstPage() {
  const value = useContext(AuthContext);
  return (
     <div>
      {value.auth.email ? (<div> <Entry /></div> ): ( <div> 
      <Routes><Route path="/CreateUser" element={<CreateUser />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword1 />} />
      <Route exact path="/" element={<Login />} /></Routes>
      </div> )}
    </div>
  );
}

export default FirstPage;
