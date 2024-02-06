import * as actions from './index';
import axios from "axios"
import { getAuthHeader, removeTokenCookie, getTokenCookie } from "utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";


export const productsBySort = ({ limit,sortBy,order}) => {
    return async(dispatch)=>{
        try{
            const products = await axios.get(`/api/products/all`,{
                params:{
                    limit,
                    sortBy,
                    order
                }
            });
            switch(sortBy){
                case 'itemSold':
                    dispatch(actions.productsBySold(products.data));
                break;
                case 'date':
                    dispatch(actions.productsByDate(products.data));
                break;
                default:
                    return false
            }
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsByPaginate= (args)=>{
    return async(dispatch)=>{
        try{
            const products = await axios.post('/api/products/paginate/all',args)
           
            dispatch(actions.productsByPaginate(products.data))
        }
        catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsById = (id)=>{
    return async(dispatch)=>{
        try{
            const product = await axios.get(`/api/products/product/${id}`)
            dispatch(actions.productsById(product.data))
        }
        catch(error){
            console.log(error);
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productRemove = (id) =>{
    return async(dispatch)=>{
        try{
            await axios.delete(`/api/products/product/${id}`,getAuthHeader())
            dispatch(actions.productRemove())
            dispatch(actions.successGlobal())
        }
        catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productAdd = (prod) =>{
    return async(dispatch)=>{
        try{
            const product = await axios.post('/api/products',prod,getAuthHeader())
            dispatch(actions.productAdd(product.data))
            dispatch(actions.successGlobal('Product Added'))

        }
        catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productEdit  =(values,id) =>{
    return async(dispatch)=>{
        try{
             await axios.patch(`/api/products/product/${id}`,values,getAuthHeader())
          
            dispatch(actions.successGlobal('Update done'))

        }
        catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}