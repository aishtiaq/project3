import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Modal from '../Modal';
import {fetchTasks, createTask, editTask, deleteTask} from '../../actions/taskActions';
import {fetchUsers} from '../../actions/userActions';
import { connect } from "react-redux";
import moment from 'moment';
import "./Validate.css";


const Container = styled.div`
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 33%;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
  background-color: #edf0f4;
  
`;

const Title = styled.div`
  padding: 10px;
  color: #254c69;
  font-weight: 800px;
  font-size: 20px;
`;

const FloatRight = styled.div`
   float: right;
`;  

const TaskList = styled.div`
  padding: 10px;
  flex-grow: 1;
  min-height: 100px;
  overflow: auto;
`;

class Column extends React.Component {

  state = {
    show: false,
    clickedID: "",
    taskName: "",
    taskDetails: "",
    taskID: "",
    isValid: true,
    action: "",
    dueDate: "",
    errors: {},
    userSelected: "",
    selfOrAssigned: ""
  }

  componentDidMount = () => {
    this.props.fetchUsers();
    
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  addTask = id => {
      this.setState({clickedID: id, action: "add"});
      this.showModal();
  }

  onChange = e => {
    //e.target.classList.add('active');

    this.setState({ [e.target.id]: e.target.value });

    //this.showInputError(e.target.name);
  };

  onSubmit = () => {
    var user="";
    var isAssigned=""
    if (this.props.teamOrUser !== 'team') {
      isAssigned='self';
      user = this.props.teamOrUser;
    } else {
      isAssigned= 'assigned';
    }

    var status;
    if (this.state.clickedID==='column-new') {
      status = 'New'
    } else if (this.state.clickedID==='column-ip') {
      status = 'In Progress'
    } else if (this.state.clickedID==='column-done') {
      status = 'Done'
    }  

    console.log("due date is "+ this.state.dueDate);
    var task = {
      taskName: this.state.taskName,
      taskDetails: this.state.taskDetails,
      dueDate: this.state.dueDate,
      status: status,
      selfOrAssigned: isAssigned
    };

    if(user !== "") {
      task.user = user;
    } else if(this.state.userSelected!=="") {
      task.user = this.state.userSelected;
    }
    
    if (!(this.showFormErrors())) {
      console.log('form is invalid: do not submit');
    } else {
      console.log('form is valid: submit');
    
      if (this.state.action === "add") {
        
        if(task.status === 'Done')
          task.completeDate = new Date();
     
        this.props.createTask(task);
      } else {
  
        task.taskId= this.state.taskID;
        this.props.editTask(task);
      }
      this.hideModal();

      this.setState({clickedID: "",
        taskName: "",
        taskDetails: "",
        taskID: "",
        action: "",
        dueDate: "",
        userSelected: "",
      selfOrAssigned: ""});

      console.log(this.props.teamOrUser);
      this.props.fetchTasks(this.props.teamOrUser);
    }
  };

  showFormErrors() {
    const inputs = document.querySelectorAll('input, textarea');
    let isFormValid = true;
    // console.log("inputs: " + inputs);
    inputs.forEach(input => {
      input.classList.add('active');
      
      const isInputValid = this.showInputError(input.id);
      
      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }
  
  showInputError(refName) {
    // const validity = this.refName.validity;
    
    const field = document.getElementById(refName);
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);

    if ((field.value == "")) {
      error.textContent = `${label} is a required field`; 
      return false;
    }

    error.textContent = '';
    return true;
    
  }

  editTask = (task,id) => {
    this.setState({
        clickedID: id,
        taskID: task._id,
        taskName: task.taskName,
        taskDetails: task.taskDetails,
        dueDate: task.dueDate ? moment(task.dueDate).format("YYYY-MM-DD") : "",
        userSelected: task.user===undefined ? "" :task.user._id,
        action: "edit"
    });
    this.showModal();
  }

  deleteTask = (id) => {
    console.log("in delete task" +id);
    this.props.deleteTask(id);
    console.log(this.props.teamOrUser);
    this.props.fetchTasks(this.props.teamOrUser);
  }


  onClose = () => {
    this.setState({
        clickedID: "",
        taskName: "",
        taskDetails: "",
        taskID: "",
        action: "",
        dueDate: "",
        userSelected: ""});
    this.hideModal();
  }

  render() {
    return (
        <Container>
        <Title>{this.props.column.title} <FloatRight><i onClick={() => this.addTask(this.props.column.id)}  className="far fa-plus-square"></i></FloatRight></Title>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.tasks.tasks.map((task, index) => (
                task.status === this.props.column.title ?
                (
                  <Task column={this.props.column.title} key={task._id} detail={task} index={index} onClick={() => this.editTask(task,this.props.column.id)} onDelete={() => this.deleteTask(task._id)}/>
               ): (<span/>)
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        <Modal show={this.state.show} handleClose={this.hideModal}>
            {
              <form novalidate>
                <div className="form-group">
                  <label id="taskNameLabel" htmlFor="taskName">Task Name:</label>
                  <input 
                    onChange={this.onChange}
                    value={this.state.taskName}
                    type="text"
                    className="form-control validate" 
                    id="taskName"
                    placeholder="Task Name" 
                    required
                  />
                </div>
                <div id="taskNameError" className="taskNameError error"></div>
                <div className="form-group">
                  <label id="taskDetailsLabel" htmlFor="taskDetails">Task Details:</label>
                  <textarea 
                    onChange={this.onChange}
                    value={this.state.taskDetails}
                    className="form-control validate" 
                    id="taskDetails" 
                    rows="5" 
                    cols="30" 
                    placeholder="Task Details" 
                    required
                  />
                </div>
                <div id="taskDetailsError" className="taskDetailsError error"></div>
                <div hidden = {this.props.teamOrUser==='team' ? false : true} className="form-group">
                  <label htmlFor="user">Assign To: </label>
                    <select className="form-control" id="userSelected" value={this.state.userSelected} onChange={this.onChange}>
                        <option value="" selected disabled hidden>Select User...</option>
                        {this.props.users.users.map((e, key) => {
                           return <option  value={e._id} >{e.firstName} {e.lastName} </option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                  <label id="dueDateLabel" htmlFor="dueDate">Due Date:</label>
                  <input 
                    onChange={this.onChange}
                    value={this.state.dueDate}
                    id="dueDate" 
                    type="date" 
                    className="form-control validate"
                    required
                  />
                </div>
                <div id="dueDateError" className="dueDateError error"></div>
                <div className="btn-group">
                  <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                </div>
                <div className="btn-group ml-2">
                  <button type="button" className="btn btn-primary" onClick={this.onClose}>Close</button>
                </div>
              </form>
            }
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  users: state.users,
  task: state.task
});

export default connect(mapStateToProps, {fetchTasks,createTask,fetchUsers, editTask, deleteTask})(Column);