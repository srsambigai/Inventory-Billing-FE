import React, { useState, useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../MainPage/MainPage.css';
import { getStocks } from './stockService';
import AuthContext from '../context/AuthProvider';
import '../ProductManagement/products.css';
const StockTracking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
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
    gettingAllStocks();
  }, []);// Empty dependency array ensures useEffect runs only once (on component mount) 
  const gettingAllStocks = async () => {
    try{
      const token=value.auth.accessToken;
        const allStocks  = await getStocks(token);
     //   console.log('Stocks:', allStocks);
        if(allStocks){
        setData(allStocks.data); // Assuming response.data is an array of records
        // setLoading(false);
      }else{
        setMessage("No Data available");
      }
    }catch(error){
        console.log('Error while Getting All Stocks')
    }
}
   return(
        <div className='productcontainer'>
            <h2>Stock List</h2> 
            <div>
            {message ? ( <p>{message}</p> ) :( <div>
        <table align='center' className='inventory-table'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Inventory</th>
              <th>Units Sold</th>
              <th>Current Stock</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item.productid}>
                <td>{item.productid}</td> 
               <td> {item.productname} </td>
               <td> {item.productinventory} </td>
               <td> {item.unitsold}</td>
               <td> {item.currentstock}</td>
              </tr>
            ))}
          </tbody>
        </table>
     </div> )} <nav className='nav1'>
          <ul>
          <li>
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
        </div>
    )
   
}
export default StockTracking;