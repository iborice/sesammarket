// saleActions.js
import { createAsyncThunk } from '@reduxjs/toolkit'

//const backendURL = 'http://127.0.0.1:5000';
export const getProduct = createAsyncThunk(
  'sale/getProduct',
  async ({ reference, quantity }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    //   const { data } = await axios.post(
    //     `${backendURL}/api/user/login`,
    //     { email, password },
    //     config
    //   )
    const data = await window.api.getProduct({reference});
    if(data!=undefined){
        return {
            product: data,
            quantity: quantity
        }
    }else{
        return rejectWithValue("Produit inexistant")
    }
    
      // store user's token in local storage
      //localStorage.setItem('userToken', data.userToken);
      //return rejectWithValue("Nom d'utilisateur ou mot de passe incorrect");
      //return data
    } catch (error) {
        console.log(error)
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)