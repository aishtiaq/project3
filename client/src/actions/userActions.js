import {FETCH_USERS} from './types';
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
}
