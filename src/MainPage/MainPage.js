import React from 'react';
import './MainPage.css';
const MainPage= () => {
    return(
        <div className='container1'>
            <h2> Inventory Billing App Info</h2>
            <p><b>This App has 5 Modules </b></p>
            <dl>
                <dt align="left"><b>Product Management</b></dt>
             <dd align="left">This Module contains information about products like Product name,quantity and unitPrice.Admin can Add,Update,Delete,View Products</dd>
             <br />
             <dt align="left"><b>Billing </b></dt> 
             <dd align="left">
             This Module contains information about Billing like ,customer details and product details with its updated quantity.
             Privileged user can Add,Update,Delete,View Billing.
             </dd>
             <br />
             <dt align="left"><b>CustomerManagement</b></dt>
             <dd align="left">This module contains information about Customer like Customer name,Address Phone and Email.Admin can Add,Update,Delete,View Customer</dd>
             <br />
             <dt align="left"><b>Sales Report</b></dt>
             <dd align="left">
               This module displays the information about the number of products has been sold and its total price on a selected day.
              Admin can view this module.
             </dd><br />
             <dt align="left"><b>Stock Information</b></dt>
             <dd align="left">This module maintains the product stock information based on selling.Admin can view this module.</dd>
             </dl>
           
        </div>
    )
}
export default MainPage;