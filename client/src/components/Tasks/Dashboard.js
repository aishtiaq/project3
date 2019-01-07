import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Lists from "./Lists";
import "react-tabs/style/react-tabs.css";
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Button, Footer } from "../Home/HomeStyle";
import { setCurrentUser,logoutUser } from "../../actions/authActions";
import {connect} from 'react-redux';


const theme = {
    font: "Abel, sans-serif",
  };

class Dashboard extends Component {
  
    componentWillMount = () => {
      console.log("in component mount");
      console.log(this.props.auth.user.id);
    }


    handleLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
  
  render() {

    return (
        <ThemeProvider theme={theme}>
        <div>
        <HeaderWrapper>
          <HeaderText>TASK MASTER
          <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
          </HeaderText>
            <Button>
              <button
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              onClick={this.handleLogout}
              className="btn mx-2 btn-primary"
            >
              Logout
            </button>
            </Button>
      </HeaderWrapper>
        <Tabs>
        <TabList>
          <Tab>My Tasks</Tab>
          <Tab>Team Tasks</Tab>
        </TabList>
     
        <TabPanel>
          <Lists whichList={this.props.auth.user.id} />
        </TabPanel>
        <TabPanel>
         <Lists whichList="team"/>
        </TabPanel>
      </Tabs>
      <Footer>GWBootcamp <br/> Abeer Ishtiaq ✨ Sean Stubbs ✨ Athena Olson <br/> Copyright 2019 </Footer> 
      
      </div>
      
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, {setCurrentUser,logoutUser})(Dashboard);
