import React from 'react';
import './MainPage.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from '../Login/Login';
const handleSignOut = () => {
    // Clear any authentication-related data (e.g., tokens, user information)
    localStorage.removeItem('accessToken'); // Remove token from localStorage, assuming it's stored there
 };
const Header= () => {
    return(
        <div>
         <a className="aout" href="/" onClick={handleSignOut}>Sign Out</a>
            <h2 className='header'> Inventory Billing</h2>
        </div>
    )
}
export default Header;