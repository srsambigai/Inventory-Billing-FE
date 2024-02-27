import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddProducts from '../ProductManagement/AddProducts';
import ProductManagement from '../ProductManagement/ProductManagement';
import Billing from '../Billing/Billing';
import AddBilling from '../Billing/AddBilling';
import GenerateBill from '../Billing/GenerateBill';
import CustomerManagement from '../CustomerManagement/CustomerManagement';
import AddCustomers from '../CustomerManagement/AddCustomers';
import SalesReport from '../SalesReport/SalesReport';
import StockTracking from '../StockTracking/StockTracking';
import Login from '../Login/Login';
import MainPage from '../MainPage/MainPage';
import CreateUser from '../Login/CreateUser';
import Footer from './Footer';

const Navigation= () => {
    return(
        <div>
        <nav className='nav'>
          <ul>
            <li>
              <Link to="/MainPage" className='link'>Home</Link>
            </li>
            <li>
              <Link to="/ProductManagement" className='link'>Product Management</Link>
            </li>
            <li>
              <Link to="/billing" className='link'>Billing</Link>
            </li>
            <li>
              <Link to="/CustomerManagement" className='link'>Customer Management</Link>
            </li>
            <li>
              <Link to="/SalesReport" className='link'>Sales Report</Link>
            </li>
            <li>
              <Link to="/StockTracking" className='link'>Stock Tracking</Link>
            </li>
          </ul>
        </nav>
          <hr/>
        <Routes>
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/AddProducts" element={<AddProducts />} />
        <Route path="/ProductManagement" element={<ProductManagement />} />
        <Route path="/billing/*" element={<Billing />} />
        <Route path="/addbilling" element={<AddBilling />} />
        <Route path="/generatebill" element={<GenerateBill />} />
        <Route path="/CustomerManagement" element={<CustomerManagement/>} />
        <Route path="/AddCustomers" element={<AddCustomers />} />
        <Route path="/SalesReport" element={<SalesReport />} />
        <Route path="/StockTracking" element={<StockTracking />} />
      </Routes>
      
      </div>
    
    )
}
export default Navigation;