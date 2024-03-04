import React, { useState, useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../MainPage/MainPage.css';
import { getProducts,updateProduct,deleteProduct } from './productService';
import AuthContext from '../context/AuthProvider';
import './products.css'
const ProductManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const value = useContext(AuthContext);
// Calculate the indexes of the first and last items to be displayed
const itemsPerPage=5;
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    gettingAllProducts();
  }, []);// Empty dependency array ensures useEffect runs only once (on component mount) 
  const gettingAllProducts = async () => {
    try{
      const token=value.auth.accessToken;
        const allProducts  = await getProducts(token);
       // console.log('Products:', allProducts);
        if(allProducts){
        setData(allProducts.data); // Assuming response.data is an array of records
        // setLoading(false);
      }else{
        setMessage("No Data available");
      }
    }catch(error){
        console.log('Error while Getting All Products')
    }
}

const handleProductChange = (value,id) => { 
  const newData = data.map(item => {
    if (item.productid === id) {
      return { ...item, ...value};
    }
    return item;
  });
  setData(newData);
}

const updatingProduct = (productId) => {
      try{
         data.forEach(item => {
          if (item.productid === productId) {
            const token=value.auth.accessToken;
            const response  = updateProduct(productId,item,token);
            setMessage1(`Product ${productId} has been updated`)
           // console.log('Updating Product Response: ', response)
          }
        });
      }
    catch(error){
          console.log('Error while updating Product')
      }
  }

  const deletingProduct = async(productId) => {
        try{
          const token=value.auth.accessToken;
            const response  = await deleteProduct(productId,token);
            setMessage1(`Product ${productId} has been Deleted`)
          //  console.log('Deleting Product Response:', response);
            gettingAllProducts();
        }catch(error){
            console.log('Error while deleting Product');
        }
    }
  return(
        <div className='productcontainer'>
            <h2>Product List</h2> 
            <div>
            {message1 && <p> {message1} </p>}
            {message ? ( <p>{message}</p> ) :(
        <table align='center' className='inventory-table'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Update Product</th>
              <th>Delete Product</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}*/}
            {currentItems.map(item => (
              <tr key={item.productid}>
                <td>{item.productid}</td> 
               <td> <input type="text" value={item.productname} onChange={(e) => handleProductChange({productname: e.target.value},item.productid)}/> </td>
               <td> <input type="text" value={item.productdescription} onChange={(e) => handleProductChange({productdescription:e.target.value},item.productid)}/> </td>
               <td> <input type="text" value={item.quantity} onChange={(e) => handleProductChange({quantity:e.target.value},item.productid)}/></td>
               <td> <input type="text" value={item.unitprice} onChange={(e) => handleProductChange({unitprice:e.target.value},item.productid)}/></td>
                <td><button className="productbtn" onClick={() => updatingProduct(item.productid)}>Update</button></td>
                <td><button className="productbtn" onClick={() => deletingProduct(item.productid)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
        <nav className='nav1'>
          <ul>
          <li>
             <Link to="/AddProducts" className='link1'>Add Products</Link>
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
export default ProductManagement;