/*
import React from 'react';
import { useAuth } from './AuthContext';

const LoginComponent = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Perform login action
    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;

*/


import { useFormik, Formik, Form, Field ,ErrorMessage} from 'formik';
import { getUser} from './userService';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React,{useState,useEffect,useContext} from 'react';
import Entry from './Entry';
import AuthContext from '../context/AuthProvider';
import CreateUser from './CreateUser';
import '../MainPage/MainPage.css';

const Login = () => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('false');
    const { setAuth } = useContext(AuthContext);
    
    let signinData={};
   
   

    return (
      <div> 
         <div className='user-container'>
           <div className='form-container'>
                    <Formik
                        initialValues={{
                          email:"",password: ""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                              errors.email = 'Email is required';
                            }
                            if (!values.password) {
                              errors.password= 'Password is required';
                            }
                            return errors;
                          }}
                        onSubmit={async (values) => {
                            console.log("onsubmit",values);
                            signinData=await getUser(values);
                          
                          
                          if(signinData.data.message==="User signed-in successfully."){
                            console.log("data",signinData);
                            
                           const accessToken = signinData.data.token;
                            const roles = signinData.data.data;
                            const email=values.email;
                            const password=values.password
                            setAuth({email,password, roles, accessToken });
                            localStorage.setItem('accessToken', accessToken);
                            
                            console.log("Signed in");
                            setUser(true);
                            setMessage("Signed in");
                            }
                           else{
                            setUser(false);
                            console.log("Invalid Credentials");
                           }
                          }} 
                       >
                       
                        {user===true ? ( <div> <Entry /> </div> ) : (<div>
                          <h1>Inventory App Login</h1> 
                        <Form className='form'>
                        
                            <div> 
                                <label>User Name: </label>
                                <Field type='text' name='email' placeholder='Enter Email' /> 
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div>
                                <label>Password: </label>
                                <Field type='password' name='password'  placeholder='Enter Password' />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            <div>
                                <button type="submit">Login</button>
                                <a role="button" href="/CreateUser"> Create new account </a>
                                <a role="button" href="/ForgotPassword"> Forgot Password </a>
                                </div>
                        </Form> </div>)}
                    </Formik>
                </div>
               
                
            </div> 

           
            
            </div>

    )
}

export default Login;