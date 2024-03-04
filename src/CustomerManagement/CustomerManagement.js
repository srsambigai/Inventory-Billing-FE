import React, { useState, useEffect,useContext} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../MainPage/MainPage.css';
import { getCustomers,updateCustomer,deleteCustomer } from './customerService';
import AuthContext from '../context/AuthProvider';
import '../ProductManagement/products.css';
const CustomerManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const value = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

// Calculate the indexes of the first and last items to be displayed
const itemsPerPage=5;
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    gettingAllCustomers();
  }, []);// Empty dependency array ensures useEffect runs only once (on component mount) 
  const gettingAllCustomers = async () => {
    try{
      const token=value.auth.accessToken;
        const allCustomers  = await getCustomers(token);
       // console.log('Customers:', allCustomers);
        if(allCustomers){
        setData(allCustomers.data); // Assuming response.data is an array of records
       // setLoading(false);
      }else{
        setMessage("No Data available");
      }
    }catch(error){
        console.log('Error while Getting All Customers')
    }
}

const handleProductChange = (value,id) => { 
  const newData = data.map(item => {
    if (item.customerid === id) {
      return { ...item, ...value};
    }
    return item;
  });
  setData(newData);
}

const updatingCustomer = (customerId) => {
      try{
         data.forEach(item => {
          if (item.customerid === customerId) {
            const token=value.auth.accessToken;
            const response  = updateCustomer(customerId,item,token);
            setMessage1(`Customer ${customerId} has been updated`)
           // console.log('Updating Customer Response: ', response)
          }
        });
      }
    catch(error){
          console.log('Error while updating Customer')
      }
  }

  const deletingCustomer= async(customerId) => {
        try{
          const token=value.auth.accessToken;
            const response  = await deleteCustomer(customerId,token);
            setMessage1(`Customer ${customerId} has been Deleted`)
          //  console.log('Deleting customer Response:', response);
            gettingAllCustomers();
        }catch(error){
            console.log('Error while deleting Customer');
        }
    }
  return(
        <div className='productcontainer'>
            <h2>Customer List</h2> 
            <div>
              {message1 && <p> {message1} </p>}
            {message ? ( <p>{message}</p> ) :(
        <table align='center' className='inventory-table'>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Contact Person</th>
              <th>email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Update Customer</th>
              <th>Delete Customer</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}*/}
            {currentItems.map(item => (
              <tr key={item.customerid}>
                <td>{item.customerid}</td> 
               <td> <input type="text" value={item.customername} onChange={(e) => handleProductChange({customername: e.target.value},item.customerid)}/> </td>
               <td> <input type="text" value={item.contactperson} onChange={(e) => handleProductChange({contactperson:e.target.value},item.customerid)}/> </td>
               <td> <input type="text" value={item.email} onChange={(e) => handleProductChange({email:e.target.value},item.customerid)}/></td>
               <td> <input type="text" value={item.phone} onChange={(e) => handleProductChange({phone:e.target.value},item.customerid)}/></td>
               <td> <input type="text" value={item.address} onChange={(e) => handleProductChange({address:e.target.value},item.customerid)}/></td>
                <td><button className="productbtn" onClick={() => updatingCustomer(item.customerid)}>Update</button></td>
                <td><button className="productbtn" onClick={() => deletingCustomer(item.customerid)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
        <nav className='nav1'>
          <ul>
          <li>
             <Link to="/AddCustomers" className='link1'>Add Customers</Link>
             {data.length > itemsPerPage && ( 
              <ul className="link1">
              {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <button className='productbtn' onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))} </ul>
             )}
            </li>
            </ul>
            </nav>
        </div>
    )
   
}
export default CustomerManagement;