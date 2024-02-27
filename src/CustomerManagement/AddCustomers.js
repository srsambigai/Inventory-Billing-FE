
import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
import { addCustomers,getCustomers} from './customerService';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React,{useState,useEffect,useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import { all } from 'axios';
const AddCustomers = () => {
    const [message, setMessage] = useState('');
    const [cId,setcId]=useState(100);
    const value = useContext(AuthContext);
    
    useEffect(() => {
        console.log("effective");
        
        gettingHighestId()
      .then(result => {
       setcId(result);
       console.log("useeffect result",cId);
      })
      }, [cId]);
 
     
      const gettingHighestId = async() => {
        try{
          const token=value.auth.accessToken;
          const allCustomers  = await getCustomers(token);
          let c=100;
          console.log("All Customers",allCustomers.data.length);
          if(allCustomers.data.length > 0) {
            console.log("Searchin...");
          const maxCustomerId= allCustomers.data.map(item=> {
            console.log("item",item.customerid);
           return(item.customerid);
           });
           console.log("maxCustomerId",maxCustomerId);
         let highestcustomerId = Math.max(...maxCustomerId);
            console.log("highest",highestcustomerId);
           c=highestcustomerId+1;
           console.log("getting method result",c);
           return c;
           }

        else {
           return c;
        }
        }catch(error){
            console.log('Error while Getting All Customers')
        }
    }
    
 
    return (
        <div className='customer-container'>
                <h1>Customer Details</h1> 
                {value.auth.roles===2 ? (<div> <h2> Not an admin user to add customer</h2> </div> ): (<div>
                {message && <p>{message}</p>}
                
                
                <div className='form-container'>
                    <Formik
                        initialValues={{
                          customerid:"",customername: "", contactperson:"", email: "", phone:"", address:""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.customername) {
                              errors.customername = 'Customer Name is required';
                            }
                            if (!values.contactperson) {
                              errors.contactperson= 'Contact Person is required';
                            }
                            if (!values.email) {
                                errors.email= 'Email is required';
                              }
                              if (!values.phone) {
                                errors.phone= 'Phone is required';
                              }
                              if (!values.address) {
                                errors.address= 'Address is required';
                              }
                            return errors;
                          }}
                        onSubmit={async (values) => {
                            console.log("cId",cId);
                            console.log(" Befor Values",values);
                            values.customerid=cId;
                            console.log("After Values",values);
                            const token=value.auth.accessToken;
                            await addCustomers(values,token);
                            
                            setMessage(`Customer ${values.customerid} has been Inserted`);
                            values.customerid=setcId(cId+1);
                            values.customername="";
                            values.contactperson="";
                            values.email="";
                            values.phone="";
                            values.address="";
                            }}
                          >
                        <Form className='form'>
                            <div>
                                <label>Customer Id: </label>
                                <Field type='text' name='customerid' value={cId} disabled={true} /> 
                              
                            </div>
                            <div>
                                <label>Customer Name: </label>
                                <Field type='text' name='customername'  placeholder='Enter Customer Name' />
                                <ErrorMessage name="customername" component="div" />
                            </div>
                            <div>
                                <label>Contact Person: </label>
                                <Field type='text' name='contactperson' placeholder='Enter Contact Person'  />
                                <ErrorMessage name="contactperson" component="div" />
                            </div>
                            <div>
                                <label>Email: </label>
                                <Field type='text' name='email' placeholder='Enter Email'  />
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div>
                                <label>Phone: </label>
                                <Field type='text' name='phone' placeholder='Enter Phone number' />
                                <ErrorMessage name="phone" component="div" />
                            </div>
                            <div>
                                <label>Address: </label>
                                <Field type='text' name='address' placeholder='Enter Phone number' />
                                <ErrorMessage name="address" component="div" />
                            </div>
                            <div>
                                
                                <button type="submit">Add Customer</button></div>
                        </Form>
                    </Formik>
                </div> </div>)}

<div>
                                <nav className='nav'>
          <ul>
          <li>
          
              <Link to="/CustomerManagement" className='link'>Customer List</Link>
            </li>
            </ul>
            </nav>
           </div>                    

            </div>

    )
}

export default AddCustomers;