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
  background-color: ${props => props.isDue ===1 ? '#a82828' : props.isDue ===2 ? 'yellow': 'whitesmoke'};
  color: ${props => props.isDue ===1 ? 'whitesmoke' : '#33363b;'};
`;

const FlexDiv = styled.div`
   display: flex;
   cursor: pointer;
   justify-content: space-between;
`; 

const StyledH4 = styled.h4`
    margin-right: 15px;
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
        if(now.zone(-5).isAfter(this.props.detail.dueDate) ) 
            isDue=1;
        else if (moment(this.props.detail.dueDate).zone(-5).subtract(2,"days").format("MM-DD-YYYY") === moment().format("MM-DD-YYYY")) {
            console.log(this.props.detail.taskName);
            console.log(moment().format("MM-DD-YYYY")+ " date diff is: "+moment(this.props.detail.dueDate).zone(-5).subtract(2,"days").format("MM-DD-YYYY"));
            isDue=2;
        }
            
    else    
        isDue=0;
        
            
    return (
        
        <Draggable draggableId={this.props.detail._id} index={this.props.index}>
            {provided => (
                <Container isDue={isDue} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={this.props.onClick}>
                    <FlexDiv>
                        <StyledH4>
                            {this.props.detail.taskName} 
                        </StyledH4>
                        <i onClick={this.handleOnClick}  className="fas fa-times fa-lg"></i>
                    </FlexDiv>
                    {this.props.detail.user === undefined ? 
                        <span></span> :
                       ( this.props.detail.user.firstName === undefined ?
                        <span/> :
                           this.props.detail.user.firstName + " " + this.props.detail.user.lastName ) }
                            <span className="float-right">
                       { this.props.detail.dueDate === null ?
                        <span/> :
                        "Due: " +  moment(this.props.detail.dueDate).zone(-5).format("M-DD-YYYY") }
                        </span>    
                </Container>
            )}
        </Draggable> 
    );
  }
}

