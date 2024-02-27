import axios from 'axios';

//const BASE_URL = 'http://localhost:8001/v1';
const BASE_URL='https://inventory-billing-be.onrender.com/v1';

// GET

export const getCustomers = async (token) => {
    //logic to get all customers
    // axios.get();
    try{
        console.log("service start");
        const response = await axios.get(`${BASE_URL}/customers`,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        console.log("service end");
        return response.data
    }catch(error){
        console.log('Error: ', error)
    }
} 


// POST

export const addCustomers = async (data,token) => {
// logic to add new user
    try{
        const response = await axios.post(`${BASE_URL}/customers`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
}



// PUT

 export const updateCustomer = async (customerId, updateData,token) => {
    // logic to update user
    try{
       const response = await axios.put(`${BASE_URL}/updateCustomers/${customerId}`, updateData,{
        headers:{
            Authorization:`Bearer ${token}`
        }});
        return response;
        }catch(error){
        console.log('Error: ', error)
    }
    
}



// DELETE


export const deleteCustomer = async (customerId,token) => {
    try{
        const response = await axios.delete(`${BASE_URL}/deleteCustomers/${customerId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
} 