import React,{useState,useEffect,useContext} from 'react';
import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import { addUser } from './userService';
import './login.css';
const CreateUser= () => {
    const [message, setMessage] = useState('');
    return(
        <div>
           <div className='container'>  <h2>Create User</h2>

           {message && <p> {message} </p>}
           <Formik
                        initialValues={{
                          name:"",email: "", mobileNumber:"", password: "", role:"",address:""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.name) {
                              errors.name = 'Name is required';
                            }
                            if (!values.email) {
                              errors.email= 'Email is required';
                            }
                            if (!values.mobileNumber) {
                                errors.mobileNumber= 'Mobile Number is required';
                              }
                              if (!values.password) {
                                errors.password= 'Password is required';
                              }
                              if (!values.role) {
                                errors.role= 'Role is required';
                              }
                              if (!values.address) {
                                errors.address= 'Address is required';
                              }

                            return errors;
                          }}
                        onSubmit={async (values) => {
                            
                            await addUser(values);
                            
                            setMessage(`User has been Created`);
                            values.name="";
                            values.email="";
                            values.mobileNumber="";
                            values.password="";
                            values.role="";
                            values.address="";
                        }}
 >
                        <Form className='form-group'>
                            <div className="innercontainer">
                                <label>User Name: </label>
                                <Field type='text' name='name' placeholder='Enter User Name' /> 
                                </div>
                             <div className="innercontainer"> 
                                <label>Email: </label>
                                <Field type='text' name='email' placeholder='Enter Email' />
                                <ErrorMessage name="productname" component="div" />
                            </div>
                            <div className="innercontainer">
                                <label>Mobile Number: </label>
                                <Field type='text' name='mobileNumber' placeholder='Enter Mobile Number'  />
                                <ErrorMessage name="mobileNumber" component="div" />
                            </div>
                            <div className="innercontainer">
                                <label>Password: </label>
                                <Field type='text' name='password' placeholder='Enter Password'  />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            <div className="innercontainer">
                                <label>Role(Admin-1,User-2): </label>
                                <Field type='text' name='role' placeholder='Enter Role' />
                                <ErrorMessage name="role" component="div" />
                            </div>
                            <div className="innercontainer">
                                <label>Address: </label>
                                <Field type='text' name='address' placeholder='Enter Address'  />
                                <ErrorMessage name="Address" component="div" />
                            </div>
                            <div>
                                
                                <button type="submit" className='btn'>Register</button> 
                                <a role="button" className="links" href="/"> Signin </a>
                                </div>
                        </Form>
                    </Formik>
           </div>
           
        </div>
    )
}
export default CreateUser;