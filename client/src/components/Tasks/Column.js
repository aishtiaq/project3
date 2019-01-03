import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Modal from '../Modal';

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
    show: false
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false , msg: ""});
  };

  addTask = id => {
      console.log("+ clicked");
      console.log(id);
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
                  <Task key={task._id} detail={task} index={index} />
                 //console.log(task)
                
               ): (console.log(""))
              ))}
            

              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        <Modal show={this.state.show} handleClose={this.hideModal}>
            {/* add modal details here */}
        </Modal>
      </Container>
    );
  }
}

export default Column;