import {combineReducers } from 'redux';
import createTask from './createTask';

export default combineReducers({
    tasks: createTask
});