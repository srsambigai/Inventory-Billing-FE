import React,{useState,useEffect,useContext} from 'react';
import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import { addUser } from './userService';
const CreateUser= () => {
    const [message, setMessage] = useState('');
    return(
        <div>
           <h3>Create User</h3>
           <div className='form-container'> 
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
                        <Form className='form'>
                            <div>
                                <label>User Name: </label>
                                <Field type='text' name='name' placeholder='Enter User Name' /> 
                              
                            </div>
                            <div>
                                <label>Email: </label>
                                <Field type='text' name='email'  placeholder='Enter Email' />
                                <ErrorMessage name="productname" component="div" />
                            </div>
                            <div>
                                <label>Mobile Number: </label>
                                <Field type='text' name='mobileNumber' placeholder='Enter Mobile Number'  />
                                <ErrorMessage name="mobileNumber" component="div" />
                            </div>
                            <div>
                                <label>Password: </label>
                                <Field type='text' name='password' placeholder='Enter Password'  />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            <div>
                                <label>Role (Admin -1,Privileged User -2): </label>
                                <Field type='text' name='role' placeholder='Enter Role' />
                                <ErrorMessage name="role" component="div" />
                            </div>
                            <div>
                                <label>Address: </label>
                                <Field type='text' name='address' placeholder='Enter Address'  />
                                <ErrorMessage name="Address" component="div" />
                            </div>
                            <div>
                                
                                <button type="submit">Register</button> 
                                </div>
                        </Form>
                    </Formik>
           </div>
            <a role="button" href="/"> Signin </a>
        </div>
    )
}
export default CreateUser;