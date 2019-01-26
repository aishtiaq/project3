import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Modal from '../Modal';
import {fetchTasks, createTask, editTask, deleteTask} from '../../actions/taskActions';
import {fetchUsers} from '../../actions/userActions';
import { connect } from "react-redux";
import moment from 'moment';
// import "./Validate.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const DatePickerStyle = styled.div`
width: 350px;
@media (max-width: 832px){
    width: auto;
  };
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

  onDateChange= dueDate => {
    this.setState({
      dueDate: dueDate
    });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeName = e => {
    this.setState({ taskName : e.target.value });
  };

  onChangeDetails = e => {
    this.setState({ taskDetails : e.target.value });
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

  
    document.getElementById(this.state.clickedID+"_taskName").classList.remove("is-invalid");
    document.getElementById(this.state.clickedID+"_taskDetails").classList.remove("is-invalid");
    document.getElementById(this.state.clickedID+"_taskNameError").textContent = "";
    document.getElementById(this.state.clickedID+"_taskDetailsError").textContent = "";
  
    if(!this.validate()) {
      console.log('form is invalid: do not submit');
    } else {
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
      this.props.fetchTasks(this.props.teamOrUser);
    }
  };

  validate= () => {
    var errors;
  
    if (this.state.taskName.length<=0) {
      errors = true;
      document.getElementById(this.state.clickedID+"_taskName").classList.add("is-invalid");
      document.getElementById(this.state.clickedID+"_taskNameError").textContent = "Task Name cannot be empty";
    }
  
    if (this.state.taskDetails.length<=0) {
      errors = true;
      document.getElementById(this.state.clickedID+"_taskDetails").classList.add("is-invalid");
      document.getElementById(this.state.clickedID+"_taskDetailsError").textContent = "Task Details cannot be empty";
    }
  
    if (errors) 
      return false;
    else 
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
    this.props.deleteTask(id);
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
    document.getElementById(this.state.clickedID+"_taskName").classList.remove("is-invalid");
    document.getElementById(this.state.clickedID+"_taskDetails").classList.remove("is-invalid");
    document.getElementById(this.state.clickedID+"_taskNameError").textContent = "";
    document.getElementById(this.state.clickedID+"_taskDetailsError").textContent = "";
  
  }

  render() {
    return (
        <Container>
        <Title>{this.props.column.title} <FloatRight><i id={this.props.column.id} onClick={() => this.addTask(this.props.column.id)}  className="far fa-plus-square"></i></FloatRight></Title>
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
                  <label  htmlFor={`${this.props.column.id}_taskName`} >Task Name:</label>
                  <input 
                    onChange={this.onChangeName}
                    value={this.state.taskName}
                    type="text"
                    className="form-control validate" 
                    // id="taskName"
                    id={`${this.props.column.id}_taskName`}
                    placeholder="Task Name" 
                    required
                  />
                  <div id={`${this.props.column.id}_taskNameError`} className="invalid-feedback"></div>
                </div>
                 <div className="form-group">
                  <label  htmlFor="taskDetails">Task Details:</label>
                  <textarea 
                    onChange={this.onChangeDetails}
                    value={this.state.taskDetails}
                    className="form-control validate" 
                    // id="taskDetails"
                    id={`${this.props.column.id}_taskDetails`}
                    rows="5" 
                    cols="30" 
                    placeholder="Task Details" 
                    required
                  />
                  <div id={`${this.props.column.id}_taskDetailsError`} className="invalid-feedback"></div>
            
                </div>
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
                  
                  
                  <DatePickerStyle>
                  <DatePicker
                    selected={this.state.dueDate}
                    onChange={this.onDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    className="form-control"
                    placeholderText="Select the Due Date"
                  />
                  </DatePickerStyle>
                  
                  </div>
                
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