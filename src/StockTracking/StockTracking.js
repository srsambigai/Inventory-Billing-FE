import React, { useState, useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../MainPage/MainPage.css';
import { getStocks } from './stockService';
import AuthContext from '../context/AuthProvider';

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
        console.log('Stocks:', allStocks);
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
        <div>
            <h2>Stock List</h2> 
            <div>
            {message ? ( <p>{message}</p> ) :( <div>
        <table align='center' border='1' cellPadding='10'>
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
            {/* {currentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}*/}
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
     </div> )}
    </div>
        </div>
    )
   
}
export default StockTracking;