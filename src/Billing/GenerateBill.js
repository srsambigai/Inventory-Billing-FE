import React from 'react';
import { useLocation } from 'react-router-dom';
const GenerateBill= () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  const objectPassed = JSON.parse(decodeURIComponent(queryParams.get('data')));

    console.log(objectPassed.total);
    return(
        <div className='addproductcontainer'>
            <h2>Invoice Details</h2> <hr/>
            <p align="left">Bill number :  {objectPassed._id} </p>
            <p align="left">Bill date : {objectPassed.billingdate}</p>
            <p align="left">Customer Id:{objectPassed.customerid} </p>
            <p align="left">Customer Name:{objectPassed.customername}</p>
            <p align="left">Product Id:{objectPassed.productid}</p>
            <p align="left">Product Name:{objectPassed.productname} </p>
            <p align="left">Quantity:{objectPassed.quantity}</p>
            <p align="left">UnitPrice:{objectPassed.unitprice}</p> <hr/>
            <p align="left"> Total Price:{objectPassed.totalprice} </p>
            <p align="left">Tax (8%) :{objectPassed.totalprice * 0.08}</p>
            <p align="left">Invoice Amount:{(objectPassed.totalprice * 0.08)+objectPassed.totalprice}</p>
        </div>
    )
}
export default GenerateBill;