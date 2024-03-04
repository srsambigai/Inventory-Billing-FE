import React, { useState, useEffect,useContext} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../MainPage/MainPage.css';
import { getSalesReport} from './salesService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '../context/AuthProvider';
import '../ProductManagement/products.css';
const StockTracking = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const value = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);

  let totalSales=0;
 
  useEffect(() => {
    gettingSalesReport();
  }, [selectedDate]);// Empty dependency array ensures useEffect runs only once (on component mount) 
  const gettingSalesReport = async () => {
    try{
       // const salesReport  = await getSalesReport('2024-02-12T23:17:05.269Z');
     //  console.log("message",message);
       const token=value.auth.accessToken;
     //  console.log("Selected Date",selectedDate);
       const salesReport  = await getSalesReport(selectedDate,token);
     //   console.log('Sales Report:', salesReport);
        if(salesReport){
        setData(salesReport.data); // Assuming response.data is an array of records
         // setLoading(false);
      }else if(selectedDate !=null){
        setMessage("No Data available");
      }
    }catch(error){
        console.log('Error while Getting Sales Report')
    }
}
function getTotalSales(){
    try{
       // console.log("TotalSales",totalSales);
        data.forEach(item=>{
            totalSales=totalSales+item.totalprice;
         //   console.log("Total Sales",totalSales);
        })
        return totalSales;
    }catch(error){
        console.log('Error while adding Sales Total');
    }
}
const formatDate = (date) => {
    if (!date) return '';
    const isoString = date.toISOString(); // Convert date to ISO 8601 format
    return isoString.substring(0, isoString.length - 1); // Remove the 'Z' at the end
  };

  const parseDate = (str) => {
    if (!str) return null;
    return new Date(str);
  };
return(
        <div className='productcontainer'>
            <h2>Sales Report</h2> 
            <div>
           Select Date: <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS" // Specify the desired format
        timeInputLabel="Time:"
        showTimeInput
        customInput={<input />} // Use a custom input field
        value={formatDate(selectedDate)} // Convert selected date to desired format
        parseDate={parseDate} // Parse the input value back to a Date object
      /> <br/> <br/>
      <div>
        Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
      </div> <br/> <br/> </div> <div>
      {message ? ( <p>{message}</p> ) :( <div>
        <table align='center' className='inventory-table'>
          <thead>
            <tr>
              <th>Invoice number</th>
              <th>Customer name</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody> {data.map(item => (
                <tr key={item._id}>
                <td>{item._id}</td>    
                <td>{item.customername}</td> 
               <td> {item.totalprice} </td>
              </tr>
              ))}
          </tbody>
        </table>
      <hr /><br/> <br/>
    <div><center>Total Sales of Selected Date:{getTotalSales()} </center></div> </div>)} </div>

        </div>
    )
   
}
export default StockTracking;