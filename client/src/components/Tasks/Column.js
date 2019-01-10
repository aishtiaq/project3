import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Modal from '../Modal';
import {fetchTasks, createTask, editTask} from '../../actions/taskActions';
import {fetchUsers} from '../../actions/userActions';
import { connect } from "react-redux";
import moment from 'moment';

const Container = styled.div`
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 33%;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
  height: 98%;
  background-color: #eeeeee;
`;

const Title = styled.div`
  padding: 10px;
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
    action: "",
    dueDate: "",
    errors: {},
    userSelected: ""
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
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = () => {
    var user="";
    if (this.props.teamOrUser !== 'team') {
      user = this.props.teamOrUser;
      console.log("user has been set to "+user);
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
    };

    if(user !== "") {
      task.user = user;
      console.log("setting user to "+task.user);
    }
    if (this.state.action === "add") {
      this.props.createTask(task);
    } else {

      task.taskId= this.state.taskID;
        
      console.log(task);
      this.props.editTask(task);
    }
    
    this.hideModal();

    this.setState({clickedID: "",
      taskName: "",
      taskDetails: "",
      taskID: "",
      action: "",
      dueDate: "",
      userSelected: ""});

    console.log(this.props.teamOrUser);
    this.props.fetchTasks(this.props.teamOrUser);
  
  };

  editTask = (task,id) => {
    this.setState({
        clickedID: id,
        taskID: task._id,
        taskName: task.taskName,
        taskDetails: task.taskDetails,
        dueDate: moment(task.dueDate).format("YYYY-MM-DD"),
        userSelected: task.user,
        action: "edit"
    });
    this.showModal();
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
                  <Task key={task._id} detail={task} index={index} onClick={() => this.editTask(task,this.props.column.id)} />
               ): (<span/>)
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        <Modal show={this.state.show} handleClose={this.hideModal}>
            {
              <form>
                <div className="form-group">
                  <label htmlFor="taskName">Task Name:</label>
                  <input 
                    onChange={this.onChange}
                    value={this.state.taskName}
                    type="text"
                    className="form-control" 
                    id="taskName" 
                    placeholder="Task Name" 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="taskDetails">Task Details:</label>
                  <textarea 
                    onChange={this.onChange}
                    value={this.state.taskDetails}
                    className="form-control" 
                    id="taskDetails" 
                    rows="5" 
                    cols="30" 
                    placeholder="Task Details" 
                  />
                </div>
                
                <div hidden = {this.props.teamOrUser==='team' ? false : true} className="form-group">
                  <label htmlFor="user">Assign To: </label>
                    <select className="form-control" id="userSelected" value={this.state.userSelected} onChange={this.onChange}>
                        {this.props.users.users.map((e, key) => {
                           return <option  value={e._id}>{e.firstName} {e.lastName}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date:</label>
                  <input 
                    onChange={this.onChange}
                    value={this.state.dueDate}
                    id="dueDate" 
                    type="date" 
                    className="form-control"
                  />
                </div>
                
                <div className="btn-group">
                  <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-primary" onClick={this.hideModal}>Close</button>
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

export default connect(mapStateToProps, {fetchTasks,createTask,fetchUsers, editTask})(Column);