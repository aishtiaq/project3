import {combineReducers } from 'redux';
import createTask from './createTask';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    tasks: createTask,
    auth: authReducer,
    errors: errorReducer
});