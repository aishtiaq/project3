import {CREATE_TASK, FETCH_TASKS, UPDATE_TASK} from '../actions/types';


const initialState = {
    tasks: [],
    task: {}
}

export default function (state = initialState , action) {

    switch (action.type) {
        case FETCH_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        case CREATE_TASK:
            return {
                ...state,
                task: action.payload
            };
        case UPDATE_TASK: 
            return {
                ...state,
                task: action.payload
            };
        default:
            return state;
    }
}