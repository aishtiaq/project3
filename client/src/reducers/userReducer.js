import {FETCH_USERS, UPDATE_USER} from '../actions/types';


const initialState = {
    users: [],
    currentUser: {}
}

export default function (state = initialState , action) {

    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}