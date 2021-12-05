import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer, { order } from "./orderReducer";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    auth : authReducer,
    error : errorReducer,
    product : productReducer,
    cart : cartReducer,
    order : orderReducer
});

export default allReducers;

