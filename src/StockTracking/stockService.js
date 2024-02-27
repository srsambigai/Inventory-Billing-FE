import axios from 'axios';

//const BASE_URL = 'http://localhost:8001/v1';
const BASE_URL='https://inventory-billing-be.onrender.com/v1';

// GET

export const getStocks = async (token) => {
    //logic to get all products
    // axios.get();
    try{
        console.log("service start");
        const response = await axios.get(`${BASE_URL}/stocks`,{
            headers:{
                Authorization:`Bearer ${token}`
            }});
        console.log("service end");
        return response.data
    }catch(error){
        console.log('Error: ', error)
    }
} 