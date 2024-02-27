/* import React from 'react';
const Billing= () => {
    return(
        <div>
            <h2>Billing</h2>
        </div>
    )
}
export default Billing; */
import React, { useState, useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../MainPage/MainPage.css';
import { getBilling,updateBilling,deleteBilling } from './billingService';
import GenerateBill from '../Billing/GenerateBill';
import AuthContext from '../context/AuthProvider';

const Billing = () => {
  const [data, setData] = useState([]);
 // const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const value = useContext(AuthContext);
  // Select items to generate bill
 const [currentPage, setCurrentPage] = useState(1);
  
// Calculate the indexes of the first and last items to be displayed
const itemsPerPage=5;
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
let passobj={};

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    gettingAllBilling();
  }, []);// Empty dependency array ensures useEffect runs only once (on component mount) 
  const gettingAllBilling = async () => {
    try{
        const token=value.auth.accessToken;
        const allBilling  = await getBilling(token);
        console.log('Billing:', allBilling);
        if(allBilling){
        setData(allBilling.data); // Assuming response.data is an array of records
       // setLoading(false);
        }else{
          setMessage("No Data available");
        }
    }catch(error){
        console.log('Error while Getting All Billing')
    }
}

const handleProductChange = (value,id) => { 
  const newData = data.map(item => {
    if (item._id === id) {
      return { ...item, ...value};
    }
    return item;
  });
  setData(newData);
}

const updatingBilling = (billingId) => {
      try{
         data.forEach(item => {
          if (item._id === billingId) {
            const token=value.auth.accessToken;
            const response  = updateBilling(billingId,item,token);
            setMessage1(`Bill ${billingId} has been updated`)
            console.log('Updating Billing Response: ', response)
          }
        });
      }
    catch(error){
          console.log('Error while update Billing')
      }
  }

  const deletingBilling= async(billingId) => {
        try{
          const token=value.auth.accessToken;
            const response  = await deleteBilling(billingId,token);
            setMessage1(`Bill ${billingId} has been Deleted`)
            console.log('Deleting Bill Response:', response);
            gettingAllBilling();
        }catch(error){
            console.log('Error while delete Billing');
        }
    }
  return(
        <div>
            <h2>Billing</h2>  
            <div>
            <Routes>
            <Route path="/generatebill" element={<GenerateBill/>} />
            </Routes>
            {message1 && <p> {message1} </p>}
            {message ? ( <p>{message}</p> ) :(
            <table align='center' border='1' cellPadding='10'>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>UnitPrice</th>
              <th>Update Billing</th>
              <th>Delete Billing</th>
              <th>View Invoice</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))} const serializedObject = encodeURIComponent(JSON.stringify(objectToPass));*/}
            { 
            currentItems.map(item => (
              <tr key={item._id}>
                <td> <input type="text" value={item.customerid} onChange={(e) => handleProductChange({customerid: e.target.value},item._id)}/> </td>
               <td> <input type="text" value={item.customername} onChange={(e) => handleProductChange({customername: e.target.value},item._id)}/> </td>
               <td> <input type="text" value={item.productid} onChange={(e) => handleProductChange({productid:e.target.value},item._id)}/> </td>
               <td> <input type="text" value={item.productname} onChange={(e) => handleProductChange({productname:e.target.value},item._id)}/></td>
               <td> <input type="text" value={item.quantity} onChange={(e) => handleProductChange({quantity:e.target.value},item._id)}/></td>
               <td> <input type="text" value={item.unitprice} onChange={(e) => handleProductChange({unitprice:e.target.value},item._id)}/></td>
                <td><button onClick={() => updatingBilling(item._id)}>Update</button></td>
                <td><button onClick={() => deletingBilling(item._id)}>Delete</button></td>
                <td><nav className='nav'><ul> <li><Link to={`/generatebill/?data=${encodeURIComponent(JSON.stringify(item))}`} className='link'>View</Link> </li></ul></nav></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
        <nav className='nav'>
          <ul>
          <li>
             {data.length > itemsPerPage && ( 
              <ul className="link">
              {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))} </ul>
             )} <Link to="/addbilling" className='link'>Add Billing</Link>
            </li>
            </ul>
            </nav>
                  </div>
    )
   
}
export default Billing;