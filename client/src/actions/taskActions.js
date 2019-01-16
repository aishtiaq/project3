import {CREATE_TASK, FETCH_TASKS, UPDATE_TASK, DELETE_TASK} from './types';
import axios from "axios";


export const fetchTasks = teamOrUser => dispatch => {
    if(teamOrUser === 'team') {
      axios.get("/api/tasks")
      .then(res => 
        {
           console.log("")
          // console.log(res.data);
            dispatch({
          type: FETCH_TASKS,
          payload: res.data
        })
        }
      );
    } else {
      axios.get("/api/tasks/"+teamOrUser)
      .then(res => 
        {
          console.log("");
            dispatch({
          type: FETCH_TASKS,
          payload: res.data
        })
        }
      );
    }
    
}


export const createTask = taskData => dispatch => {
  console.log(taskData);
  axios.post("/api/tasks", taskData )
    .then(res => 
      dispatch({
        type: CREATE_TASK,
        payload: res.data
      })
    );
};

export const editTask = taskData => dispatch => {
  axios.put("/api/tasks/"+taskData.taskId, taskData )
    .then(res => 
      dispatch({
        type: UPDATE_TASK,
        payload: res.data
      })
    );
};

export const deleteTask = taskId => dispatch => {
  console.log(taskId);
  axios.delete("/api/tasks/"+taskId)
    .then(res => 
      dispatch({
        type: DELETE_TASK,
        payload: res.data
      })
    );
};