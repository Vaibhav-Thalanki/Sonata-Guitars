import {
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS,
    REMOVE_PROD
} from '../types';




export default function notificationsReducer(state={},action){
    switch(action.type){
        case ERROR_GLOBAL:
            return {...state, error: true, msg: action.payload}
        case SUCCESS_GLOBAL:
            return {...state, success: true, msg: action.payload}
        case CLEAR_NOTIFICATIONS:
            return {}
        case REMOVE_PROD:
            return {...state,removeProduct: true}
        default:
            return state
    }
}