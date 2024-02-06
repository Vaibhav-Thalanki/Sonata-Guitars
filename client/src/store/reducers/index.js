import { combineReducers } from "redux";
import users from './users.reducers'
import products from "./products.reducers";
import notifications from "./notification.reducers"
import brands from './brands.reducers'

const appReducers = combineReducers({
    users,
    products,
    notifications,
    brands
})

export default appReducers
