import { Server_API } from 'constants/apiConstants';
import * as actions from './index';
import axios from "axios"

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";


export const getAllBrands = () =>{
    return async(dispatch)=>{
        try{
            const brands = await axios.get(Server_API+'api/brands/all');
            dispatch(actions.getAllBrands(brands.data))
        }
        catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}