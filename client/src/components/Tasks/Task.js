import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import moment from 'moment';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  overflow: auto;
  background-color: ${props => props.isDue ? '#a82828' : 'whitesmoke'};
  color: ${props => props.isDue ? 'whitesmoke' : '#33363b;'};
`;

const FloatRight = styled.div`
   float: right;
   cursor: pointer;
`; 

export default class Task extends React.Component {
   
  handleOnClick = (e) => {
    e.stopPropagation();
    this.props.onDelete();
  }


  render() {
    var now = moment();
    var isDue;
    if(this.props.column !== 'Done')
        if(now.isAfter(this.props.detail.dueDate) ) 
            isDue=true;
        else
            isDue=false;
    else    
        isDue=false;
        
            
    return (
        
        <Draggable draggableId={this.props.detail._id} index={this.props.index}>
            {provided => (
                <Container isDue={isDue} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={this.props.onClick}>
                    <h4>{this.props.detail.taskName} 
                    <FloatRight>
                    <i onClick={this.handleOnClick}  className="fas fa-times"></i>
                    </FloatRight>
                    </h4>
                    
                    {this.props.detail.user === undefined ? 
                        <span></span> :
                       ( this.props.detail.user.firstName === undefined ?
                        <span/> :
                           this.props.detail.user.firstName + " " + this.props.detail.user.lastName ) }
                            <span className="float-right">
                       { this.props.detail.dueDate === undefined ?
                        <span/> :
                        "Due: " +  moment(this.props.detail.dueDate).format("M-DD-YYYY") }
                        </span>    
                </Container>
            )}
        </Draggable> 
    );
  }
}

