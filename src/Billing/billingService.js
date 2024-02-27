import axios from 'axios';
import { ErrorMessage } from 'formik';

//const BASE_URL = 'http://localhost:8001/v1';
const BASE_URL='https://inventory-billing-be.onrender.com/v1';

// GET

export const getBilling = async (token) => {
    //logic to get all customers
    // axios.get();
    try{
       console.log("service start");
        const response = await axios.get(`${BASE_URL}/billing`,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        console.log("service end",response);
        console.log("response.data",response.data);
        console.log("response.data.message",response.data.message);
        return response.data
    }catch(error){
        console.log('***Error: ',error);
    }
} 


// POST

export const addBilling = async (data,token) => {
// logic to add new user
    try{
        console.log("addBilling start",data);
        console.log("addBilling token",token);
        const response = await axios.post(`${BASE_URL}/billing`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
            console.log("addBilling End",response);
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
}



// PUT

 export const updateBilling = async (billingId, updateData,token) => {
    // logic to update user
    try{
       const response = await axios.put(`${BASE_URL}/updateBilling/${billingId}`, updateData,{
        headers:{
            Authorization:`Bearer ${token}`
        }});
        return response;
        }catch(error){
        console.log('Error: ', error)
    }
    
}



// DELETE


export const deleteBilling = async (billingId,token) => {
    try{
        const response = await axios.delete(`${BASE_URL}/deleteBilling/${billingId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
} 