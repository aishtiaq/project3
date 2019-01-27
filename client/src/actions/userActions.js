import {SET_CURRENT_USER,FETCH_USERS, UPDATE_USER, FETCH_USER} from './types';
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
// import {  GET_ERRORS,SET_CURRENT_USER,USER_LOADING} from "./types";


export const fetchUsers = () => dispatch => {
  
      axios.get("/api/users")
      .then(res => 
        {
            dispatch({
                type: FETCH_USERS,
                payload: res.data
                })
        }
      );
};

export const editUser = (userData, history) => dispatch => {
  axios.put("/api/users/"+userData.userId, userData )
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      
      history.push("/dashboard");
    }
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};