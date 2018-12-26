import React, { Component } from 'react';
import Column from './Column';
import {connect} from 'react-redux';
import { fetchTasks, editTask } from '../actions/taskActions'
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';



const Container = styled.div`
  display: inline-flex;
  height: 100%;

`;

class MyDashboard extends Component {

    componentWillMount() {
      this.props.fetchTasks();
      console.log(this.props.tasks);
    }

    // componentDidMount() {
    //   this.props.fetchTasks();
    //   console.log(this.props);
    // }

 
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
        // const begin = this.state.columns[source.droppableId];
        // const end = this.state.columns[destination.droppableId];
    
        // const begin = this.props.columns[source.droppableId];
        // const end = this.props.columns[destination.droppableId];
       
        // if (begin === end) {
        //   const newTaskIds = Array.from(begin.taskId);
        //   newTaskIds.splice(source.index, 1);
        //   newTaskIds.splice(destination.index, 0, draggableId);
      
        //   const newColumn = {
        //     ...begin,
        //     taskId: newTaskIds,
        //   };
        //   const newState = {
        //     ...this.state,
        //     columns: {
        //       ...this.state.columns,
        //       [newColumn.id]: newColumn,
        //     },
        //   };
        //   this.setState(newState);
        //   return;
        // }
        // const beginTaskIds = Array.from(begin.taskId);
        // beginTaskIds.splice(source.index, 1);
        // const newBegin = {
        //   ...begin,
        //   taskId: beginTaskIds
        // };
        // const endTaskIds = Array.from(end.taskId);
        // endTaskIds.splice(destination.index, 0, draggableId);
        // const newEnd = {
        //   ...end,
        //   taskId: endTaskIds
        // };
        // const newState = {
        //   ...this.state,
        //   columns: {
        //     ...this.state.columns,
        //     [newBegin.id]: newBegin,
        //     [newEnd.id]: newEnd,
        //   },
        // };
        // this.setState(newState)
      };
  
  
  render() {
    return (
      <div>
      <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
              <Column key='column-new' column={{'id':'column-new','title':'New'}} tasks={this.props.tasks} />
              <Column key='column-ip' column={{'id':'column-ip','title':'In Progress'}} tasks={this.props.tasks} />
              <Column key='column-done' column={{'id':'column-done','title':'Done'}} tasks={this.props.tasks} />
              {/* {this.props.tasks.columnsort.map(columnId => {
                  const column = this.props.tasks.columns[columnId];
                  const tasks = column.taskId.map(taskId => this.props.tasks.tasks[taskId]);
                  return <Column key={Column.id} column={column} tasks={tasks} />;
              })}
              {this.props.tasks.columnsort.map(columnId => {
                  const column = this.props.tasks.columns[columnId];
                  const tasks = column.taskId.map(taskId => this.props.tasks.tasks[taskId]);
                  return <Column key={Column.id} column={column} tasks={tasks} />;
              })} */}
          </Container>
      
      </DragDropContext>
      
        
          
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps, {fetchTasks,editTask})(MyDashboard);