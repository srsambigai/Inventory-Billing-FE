import React,{useState,useEffect,useContext} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Login';
import { resetPassword } from './userService';
import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
import { useLocation } from 'react-router-dom';
import './login.css'
const ResetPassword1 = () =>{
  const [message, setMessage] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  //const objectPassed = JSON.parse(decodeURIComponent(queryParams.get('token')));
  const token = decodeURIComponent(queryParams.get('token'));
  const userId=decodeURIComponent(queryParams.get('userId'));
 // console.log(token);
 // console.log(userId);

  return(
    <div>
           <div className='container'><h2> Reset Password</h2>
           { message &&  <p> {message} </p> } 
           <div className='form-container'>
           <Formik
           initialValues={{
            userId:userId,
            token:token,
            newPassword:""
          }}
          validate={(values) => {
            const errors = {};
            if (!values.newPassword) {
              errors.newPassword = 'Password is required';
            }
            return errors;
          }}
          onSubmit={async (values) => {
           // console.log("onsubmit",values);
            const resetData=await resetPassword(values);
           // console.log("message",resetData.data.message);
          if(resetData.data.message){
             setMessage(resetData.data.message);
            }
           } 
         } 
           > 
           <Form className='form-group'>
                        <div> 
                       <label>Password: </label>
                             <Field type='password' name='newPassword' placeholder='Enter Password' /> 
                             <ErrorMessage name="newPassword" component="div" />
                         </div>
                         <div>
                             <button type="submit" className='btn'>Reset Password</button>
                               </div>
                     </Form> 
              </Formik>
            </div>
            <a role="button" className='links' href="/"> Signin </a>
            </div>
           </div>
  )
}
export default ResetPassword1;