import axios from 'axios';

//const BASE_URL = 'http://localhost:8001/v1';
const BASE_URL='https://inventory-billing-be.onrender.com/v1';

// GET

export const getUser = async (data) => {
    //logic to get all products
    // axios.get();
    try{
     //   console.log("service start",data);
        const response = await axios.post(`${BASE_URL}/signin`,data);
      //  console.log("service end",response.data.message);
       // console.log("token",response.data.token);
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
} 


// POST

export const addUser = async (data) => {
// logic to add new user
    try{
      //  console.log("addUser data",data);
        const response = await axios.post(`${BASE_URL}/signup`, data);
      //  console.log("addUser response",response);
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
}
// POST

export const forgotPassword = async (data) => {
    // logic to add new user
        try{
         //   console.log("Forgot Password",data);
            const response = await axios.post(`${BASE_URL}/forgotPassword`, data);
         //   console.log("Forgot Password response",response);
            return response;
        }catch(error){
            console.log('Error: ', error)
        }
    }
 
    export const resetPassword = async (data) => {
        // logic to add new user
            try{
              //  console.log("Reset Password",data);
                const response = await axios.post(`${BASE_URL}/resetPassword`, data);
             //   console.log("Reset Password response",response);
                return response;
            }catch(error){
                console.log('Error: ', error)
            }
        }
        






