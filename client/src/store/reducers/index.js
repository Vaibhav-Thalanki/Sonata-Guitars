import { combineReducers } from "redux";
import users from './users.reducers'
import products from "./products.reducers";
import notifications from "./notification.reducers"
import brands from './brands.reducers'
import site from './site.reducer'

const appReducers = combineReducers({
    users,
    products,
    notifications,
    brands,
    site
})

export default appReducers
