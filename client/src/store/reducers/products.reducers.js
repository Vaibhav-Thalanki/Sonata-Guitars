import { GET_PROD_BY_SOLD,GET_PROD_BY_DATE,GET_PROD_PAGINATE,PRODUCT_ADD,CLEAR_PRODUCT_LAST_ADDED, GET_PROD_BY_ID, CLEAR_CURRENT_BYID_PRODUCT } from "store/types"

export default function productsReducer(state={},action){
    switch(action.type){ 
        case GET_PROD_BY_SOLD:
            return {...state,bySold:action.payload}
        case GET_PROD_BY_DATE:
                return {...state,byDate:action.payload}
        case GET_PROD_PAGINATE:
            return {...state,byPaginate: action.payload}
        case PRODUCT_ADD:
            return {...state,lastAdded: action.payload}
        case CLEAR_PRODUCT_LAST_ADDED:
            return {...state,lastAdded: null }
        case GET_PROD_BY_ID:
            return {...state, byId: action.payload}
        case CLEAR_CURRENT_BYID_PRODUCT:
            return {...state, byId: null}
        default:return state
    }
}