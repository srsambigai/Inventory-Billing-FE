/* import React from 'react';
const AddBilling= () => {
    return(
        <div>
            <h2>Create Billing</h2>
        </div>
    )
}
export default AddBilling; */


import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
import { addBilling} from './billingService';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React,{useState,useEffect,useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import { all } from 'axios';
const AddBilling = () => {
    const [message, setMessage] = useState('');
    const value = useContext(AuthContext);

 
    return (
        <div className='billing-container'>
                <h1>Billing Details</h1> 
                {value.auth.roles===1 ? (<div> <h2> Not a Privilege user to create Bill</h2> </div> ): (<div>
                {message && <p>{message}</p>}
                
                <div className='form-container'>
                    <Formik
                        initialValues={{
                          customerid:"",customername: "", productid:"", productname: "", quantity:""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.customerid) {
                                errors.customerid = 'Customer Id is required';
                              }
                            if (!values.customername) {
                              errors.customername = 'Customer Name is required';
                            }
                            if (!values.productid) {
                              errors.productid= 'Product Id is required';
                            }
                            if (!values.productname) {
                                errors.productname= 'Product Name is required';
                              }
                              if (!values.quantity) {
                                errors.quantity= 'Quantity is required';
                              }
                            return errors;
                          }}
                        onSubmit={async (values) => {
                            console.log(" Befor Values",values);
                            const token=value.auth.accessToken;
                            await addBilling(values,token);
                            
                            setMessage(`Billing has been Inserted`);
                            values.customerid="";
                            values.customername="";
                            values.productid="";
                            values.productname="";
                            values.quantity="";
                            }}
                          >
                        <Form className='form'>
                            <div>
                                <label>Customer Id: </label>
                                <Field type='text' name='customerid' placeholder='Enter Customer Id' /> 
                                <ErrorMessage name="customerid" component="div" />
                            </div>
                            <div>
                                <label>Customer Name: </label>
                                <Field type='text' name='customername'  placeholder='Enter Customer Name' />
                                <ErrorMessage name="customername" component="div" />
                            </div>
                            <div>
                                <label>Product Id: </label>
                                <Field type='text' name='productid' placeholder='Enter Product Id'  />
                                <ErrorMessage name="productid" component="div" />
                            </div>
                            <div>
                                <label>Product Name: </label>
                                <Field type='text' name='productname' placeholder='Enter Product Name'  />
                                <ErrorMessage name="productname" component="div" />
                            </div>
                            <div>
                                <label>quantity: </label>
                                <Field type='text' name='quantity' placeholder='Enter Product quantity' />
                                <ErrorMessage name="quantity" component="div" />
                            </div>
                            <div>
                                 <button type="submit">Create Billing</button>
                                 </div>
                        </Form>
                    </Formik>
                </div>
             
                                 </div>  )
                }
                <div>
                               <nav className='nav'>
          <ul>
          <li>
          
              <Link to="/billing" className='link'>Billing</Link>
            </li>
            </ul>
            </nav></div>
                                </div>

    )
}

export default AddBilling;