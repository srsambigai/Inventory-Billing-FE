import React from 'react';
import { useLocation } from 'react-router-dom';
const GenerateBill= () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  const objectPassed = JSON.parse(decodeURIComponent(queryParams.get('data')));

    console.log(objectPassed.total);
    return(
        <div>
            <h2>Invoice Details</h2>
            <p>Bill number: {objectPassed._id} </p>
            <p>Bill date: {objectPassed.billingdate}</p>
            <p>Customer Id:{objectPassed.customerid} </p>
            <p>Customer Name:{objectPassed.customername}</p>
            <p>Product Id:{objectPassed.productid}</p>
            <p>Product Name:{objectPassed.productname} </p>
            <p>Quantity:{objectPassed.quantity}</p>
            <p>UnitPrice:{objectPassed.unitprice}</p>
            <p> Total Price:{objectPassed.totalprice} </p>
            <p>Tax (8%) :{objectPassed.totalprice * 0.08}</p>
            <p>Invoice Amount:{(objectPassed.totalprice * 0.08)+objectPassed.totalprice}</p>
        </div>
    )
}
export default GenerateBill;