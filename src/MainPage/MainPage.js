import React from 'react';

const MainPage= () => {
    return(
        <div>
            <h2> Inventory Billing App Info</h2>
            <p>This App has 5 Modules</p>
            <dl>
                <dt><b>Product Management</b></dt>
             <dd>This Module contains information about products like Product name,quantity and unitPrice.Admin can Add,Update,Delete,View Products</dd>
             <dt><b>Billing </b></dt>
             <dd>
             This Module contains information about Billing like ,customer details and product details with its updated quantity.
             Privileged user can Add,Update,Delete,View Billing.
             </dd>
             <dt><b>CustomerManagement</b></dt>
             <dd>This module contains information about Customer like Customer name,Address Phone and Email.Admin can Add,Update,Delete,View Customer</dd>
             <dt><b>Sales Report</b></dt>
             <dd>
               This module displays the information about the number of products has been sold and its total price on a selected day.
              Admin can view this module.
             </dd>
             <dt><b>Stock Information</b></dt>
             <dd>This module maintains the product stock information based on selling.Admin can view this module.</dd>
             </dl>
           
        </div>
    )
}
export default MainPage;