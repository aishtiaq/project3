import React, { Component } from 'react';
import Column from './Column';
import {connect} from 'react-redux';
import { fetchTasks, editTask } from '../../actions/taskActions'
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
//import { HeaderWrapper, HeaderText, CatchPhrase, LogoutButton, Footer } from "./DashboardStyle";
import { ThemeProvider } from 'styled-components';
// import { HeaderText, HeaderWrapper } from "../Home/HeaderStatic";
import { logoutUser } from "../../actions/authActions";

const Container = styled.div`
  display: inline-flex;
  height: 100%;
`;

const theme = {
  font: "Abel, sans-serif",
};

class Lists extends Component {

    componentWillMount() {
      this.props.fetchTasks();
      console.log(this.props.tasks);
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
            this.props.fetchTasks();
        }
      };
  
  


  render() {
    return (
      <ThemeProvider theme={theme}>
      <div>
        
      
      
      <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
              <Column key='column-new' column={{'id':'column-new','title':'New'}} tasks={this.props.tasks} />
              <Column key='column-ip' column={{'id':'column-ip','title':'In Progress'}} tasks={this.props.tasks} />
              <Column key='column-done' column={{'id':'column-done','title':'Done'}} tasks={this.props.tasks} />
              
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