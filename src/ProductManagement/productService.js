import axios from 'axios';

//const BASE_URL = 'http://localhost:8001/v1';
const BASE_URL='https://inventory-billing-be.onrender.com/v1';

// GET

export const getProducts = async (token) => {
    //logic to get all products
    // axios.get();
    try{
        console.log("service start");
        const response = await axios.get(`${BASE_URL}/products`,{
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

export const addProducts = async (data,token) => {
// logic to add new user
    try{
        const response = await axios.post(`${BASE_URL}/products`, data,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
}



// PUT

 export const updateProduct = async (productId, updateData,token) => {
    // logic to update user
    try{
        console.log("update Product",productId);
        console.log("token",token);
       const response = await axios.put(`${BASE_URL}/updateProducts/${productId}`, updateData,{
        headers:{
            Authorization:`Bearer ${token}`
        }});
        console.log("response",response);
        return response;
        }catch(error){
        console.log('Error: ', error)
    }
    
}



// DELETE


export const deleteProduct = async (productId,token) => {
    try{
        const response = await axios.delete(`${BASE_URL}/deleteProducts/${productId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        return response;
    }catch(error){
        console.log('Error: ', error)
    }
} 