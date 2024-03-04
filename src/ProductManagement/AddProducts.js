/*import React from 'react';
const ProductMangagement= () => {
    return(
        <div>
            <h2> Product Management</h2>

        </div>
    )
}
export default ProductMangagement; */
import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
import { addProducts,getProducts} from './productService';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React,{useState,useEffect,useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import './products.css'
import { all } from 'axios';
const AddProducts = () => {
    const [message, setMessage] = useState('');
    const [pId,setpId]=useState(100);
    const value = useContext(AuthContext);
    useEffect(() => {
       // console.log("effective");
        
        gettingHighestId()
      .then(result => {
       setpId(result);
     //  console.log("useeffect result",pId);
      })
      }, [pId]);
 
     
      const gettingHighestId = async() => {
        try{
          const token=value.auth.accessToken;
          const allProducts  = await getProducts(token);
          let c=100;
         // console.log("All Products",allProducts.data.length);
          if(allProducts.data.length > 0) {
         //   console.log("Searchin...");
          const maxProductId= allProducts.data.map(item=> {
         //   console.log("item",item.productid);
           return(item.productid);
           });
         //  console.log("maxProductId",maxProductId);
         let highestproductId = Math.max(...maxProductId);
        //    console.log("highest",highestproductId);
           c=highestproductId+1;
         //  console.log("getting method result",c);
           return c;
           }

        else {
           return c;
        }
        }catch(error){
            console.log('Error while Getting All Products')
        }
    }
    
 
    return (
        <div className='addproductcontainer'>
                <h2>Product Details</h2> 
                {value.auth.roles===2 ? (<div> <h3> Not an admin to Add Products</h3> </div> ): (<div>   
                {message && <p>{message}</p>}
              
                
                <div className='form-container'>
                    <Formik
                        initialValues={{
                          productid:"",productname: "", productdescription:"", quantity: "", unitprice:""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.productname) {
                              errors.productname = 'Product Name is required';
                            }
                            if (!values.productdescription) {
                              errors.productdescription= 'Product description is required';
                            }
                            if (!values.quantity) {
                                errors.quantity= 'Product Quantity is required';
                              }
                              if (!values.unitprice) {
                                errors.unitprice= 'Unit Price is required';
                              }
                            return errors;
                          }}
                        onSubmit={async (values) => {
                        //    console.log("pId",pId);
                        //    console.log(" Befor Values",values);
                            values.productid=pId;
                        //    console.log("After Values",values);
                            const token=value.auth.accessToken;
                            await addProducts(values,token);
                            
                            setMessage(`Product ${values.productid} has been Inserted`);
                            values.productid=setpId(pId+1);
                            values.productname="";
                            values.productdescription="";
                            values.quantity="";
                            values.unitprice="";
                       
                        }}

                       
                    >
                        <Form className='form-group'>
                            <div>
                                <label>Product Id: </label>
                                <Field type='text' name='productid' value={pId} disabled={true} /> 
                              
                            </div>
                            <div>
                                <label>Product Name: </label>
                                <Field type='text' name='productname'  placeholder='Enter Product Name' />
                                <ErrorMessage name="productname" component="div" />
                            </div>
                            <div>
                                <label>Product Description: </label>
                                <Field type='text' name='productdescription' placeholder='Enter Product Description'  />
                                <ErrorMessage name="productdescription" component="div" />
                            </div>
                            <div>
                                <label>Quantity: </label>
                                <Field type='text' name='quantity' placeholder='Enter Quantity'  />
                                <ErrorMessage name="quantity" component="div" />
                            </div>
                            <div>
                                <label>Unit Price: </label>
                                <Field type='text' name='unitprice' placeholder='Enter Unit Price' />
                                <ErrorMessage name="unitprice" component="div" />
                            </div>
                            <div>
                                
                                <button type="submit" className='productbtn'>Add Products</button> 
                                </div>
                        </Form>
                    </Formik>
                </div>
                </div> )
}

<div>
                                <nav className='nav1'>
          <ul>
          <li>
          
              <Link to="/ProductManagement" className='link1'>Product List</Link>
            </li>
            </ul>
            </nav>
              </div>                 
                           
            </div>

    )
}

export default AddProducts;