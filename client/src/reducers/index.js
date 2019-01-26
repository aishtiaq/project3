import {combineReducers } from 'redux';
import taskReducer from './taskReducer';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

export default combineReducers({
    tasks: taskReducer,
    auth: authReducer,
    errors: errorReducer,
    users: userReducer
});