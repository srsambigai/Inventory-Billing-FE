import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import { forgotPassword } from './userService';
import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
const ForgotPassword= () => {
    const [message, setMessage] = useState('');
    return(
        <div>
            <h3>Forgot Password</h3>
            {message &&  <p> {message} </p> }
            <div className='user-container'>
           <div className='form-container'>
                    <Formik
                        initialValues={{
                          email:""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                              errors.email = 'Email is required';
                            }
                            return errors;
                          }}
                        onSubmit={async (values) => {
                            console.log("onsubmit",values);
                            const forgotData=await forgotPassword(values);
                            console.log("message",forgotData.data.message);
                          if(forgotData.data.message){
                             setMessage(forgotData.data.message);
                            }
                           } 
                         } ><Form className='form'>
                        
                       <div> 
                           <label>User Name: </label>
                           <Field type='text' name='email' placeholder='Enter Email' /> 
                           <ErrorMessage name="email" component="div" />
                       </div>
                       <div>
                           <button type="submit">Forgot Password</button>
                             </div>
                   </Form> 
                   </Formik> </div>
            
            <a role="button" href="/"> Signin </a>
        </div> </div>
    )
}
export default ForgotPassword;