import React, { Component } from 'react';
import Column from './Column';
import {connect} from 'react-redux';
import { fetchTasks, editTask } from '../../actions/taskActions'
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { logoutUser } from "../../actions/authActions";

const Container = styled.div`
  display: inline-flex;
  height: 100%;
  width: 100%;
`;

const theme = {
  font: "Abel, sans-serif",
};

class Lists extends Component {

    componentWillMount() {
      (this.props.whichList === 'team') ? this.props.fetchTasks("team") : this.props.fetchTasks(this.props.whichList);
    }
    
    onDragEnd = result => {
        const {destination, source, draggableId} = result;
    
        if (!destination) {
          return;
        }
        
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
        
        if ( source.index !== destination.index ||
          source.droppableId !== destination.droppableId) {
            console.log(draggableId);
            var status = '';
            if (destination.droppableId==='column-new') {
              status = 'New'
            } else if (destination.droppableId==='column-ip') {
              status = 'In Progress'
            } else if (destination.droppableId==='column-done') {
              status = 'Done'
            }  
            var task = {
                status: status,
                taskId: draggableId
              }
            this.props.editTask(task);
            (this.props.whichList === 'team') ? this.props.fetchTasks("team") : this.props.fetchTasks(this.props.whichList);
        }
      };
  
  


  render() {
    return (
      <ThemeProvider theme={theme}>
      <div>
        
      
      
      <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
              <Column teamOrUser={this.props.whichList} key='column-new' column={{'id':'column-new','title':'New'}} tasks={this.props.tasks} />
              <Column teamOrUser={this.props.whichList} key='column-ip' column={{'id':'column-ip','title':'In Progress'}} tasks={this.props.tasks} />
              <Column teamOrUser={this.props.whichList} key='column-done' column={{'id':'column-done','title':'Done'}} tasks={this.props.tasks} />
              
          </Container>
      
      </DragDropContext>   
      
      </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  auth: state.auth
});

export default connect(mapStateToProps, {fetchTasks,editTask,logoutUser})(Lists);