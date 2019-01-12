import {FETCH_USERS, UPDATE_USER} from './types';
import axios from "axios";


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

export const editUser = userData => dispatch => {
  console.log(userData);
  axios.put("/api/users/"+userData.userId, userData )
    .then(res => 
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
    );
};
