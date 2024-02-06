
import { GET_PROD_BY_SOLD,GET_PROD_BY_DATE,ERROR_GLOBAL, SUCCESS_GLOBAL, CLEAR_NOTIFICATIONS,AUTH_USER,SIGN_OUT,UPDATE_USER_PROFILE,USER_CHANGE_EMAIL,GET_PROD_PAGINATE,REMOVE_PROD,GET_ALL_BRANDS, PRODUCT_ADD, CLEAR_PRODUCT_LAST_ADDED,GET_PROD_BY_ID, CLEAR_CURRENT_BYID_PRODUCT,USER_ADD_CART,USER_PURCHASE_SUCCESS } from "store/types"


// USER

export const userChangeEmail = (data) =>{
    return {
        type: USER_CHANGE_EMAIL,
        payload: data
    }
}
export const userSignOut = ()=>{
    return {
        type:SIGN_OUT,
    }
}

export const userAuthenticate = (user)=>{
    return {
        type: AUTH_USER,
        payload:user
    }
}

export const userUpdateProfile = (user) =>{
return {
    type: UPDATE_USER_PROFILE,
    payload: user
}
}

export const userAddCart = (data) =>{
    return {
        type: USER_ADD_CART,
        payload: data
    }
    }

    export const userPurchaseSuccess = (data)=>{
        return{

            type: USER_PURCHASE_SUCCESS ,
            payload: data
        }
    }


// BRANDS

export const getAllBrands =(brands)=>{
    return {
        type: GET_ALL_BRANDS,
        payload: brands
    }
}

// PRODUCTS
export const productsBySold = (data)=>{
    return {
        type:GET_PROD_BY_SOLD,
        payload:data
    }
}

export const productsByDate = (data)=>{
    return {
        type:GET_PROD_BY_DATE,
        payload:data
    }
}

export const productsById = (data)=>{
    return {
        type: GET_PROD_BY_ID,
        payload: data
    }
}

export const productsByPaginate = (products)=>{
return {
    type: GET_PROD_PAGINATE,
    payload: products
}
}

export const productRemove = ()=>{
    return {
        type: REMOVE_PROD
    }
}

export const productAdd = (prod)=>{
return {
    type: PRODUCT_ADD,
    payload: prod
}
}

export const clearProductAdd = () =>{
    return {
        type: CLEAR_PRODUCT_LAST_ADDED
    }
}

export const clearCurrentById = () =>{
    return {
        type: CLEAR_CURRENT_BYID_PRODUCT
    }
}
// NOTIFICATIONS

export const errorGlobal = (data) =>{
    return {
        type: ERROR_GLOBAL,
        payload:data
    }
}
export const successGlobal = (data) =>{
    return {
        type: SUCCESS_GLOBAL,
        payload:data
    }
}

export const clearNotifications = ()=>{
return (dispatch) =>{
    dispatch({
        type: CLEAR_NOTIFICATIONS,
    })
}
}
