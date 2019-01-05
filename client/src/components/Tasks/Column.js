import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Modal from '../Modal';
import {fetchTasks, createTask} from '../../actions/taskActions';
import { connect } from "react-redux";

const Container = styled.div`
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 33%;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
  height: 98%;
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
    dueDate: "",
    errors: {}
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  addTask = id => {
      console.log("+ clicked");
      console.log(id);
      this.setState({clickedID: id});
      this.showModal();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = () => {
    var status = '';
    if (this.state.clickedID==='column-new') {
      status = 'New'
    } else if (this.state.clickedID==='column-ip') {
      status = 'In Progress'
    } else if (this.state.clickedID==='column-done') {
      status = 'Done'
    }  
    let task = {
      taskName: this.state.taskName,
      taskDetails: this.state.taskDetails,
      dueDate: this.state.dueDate,
      status: status
    };
    console.log(task);
    this.setState({clickedID: "",
      taskName: "",
      taskDetails: "",
      dueDate: ""});
    this.props.createTask(task);
    this.hideModal();
    this.props.fetchTasks();
  
  };

  editTask = task => {
    console.log("id is "+task._id);
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
                  <Task key={task._id} detail={task} index={index} onClick={() => this.editTask(task)} />
               ): (console.log(""))
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
                    id="taskName" type="text" 
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
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date:</label>
                  <input 
                    onChange={this.onChange}
                    value={this.state.dueDate}
                    id="dueDate" 
                    type="date" 
                  />
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-danger" onClick={this.onSubmit}>Submit</button>
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
  tasks: state.tasks
});

export default connect(mapStateToProps, {fetchTasks,createTask})(Column);