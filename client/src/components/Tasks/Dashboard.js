import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Lists from "./Lists";
import "react-tabs/style/react-tabs.css";
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Button, Footer, DashboardTasks } from "../Home/HomeStyle";
import { setCurrentUser,logoutUser } from "../../actions/authActions";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";


const theme = {
    font: "Abel, sans-serif",
  };

class Dashboard extends Component {
  
    handleLogout = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
  
  render() {
    return (
        <ThemeProvider theme={theme}>
        <div>
        <BodyWrapper>
        <HeaderWrapper>
          <HeaderText>TASK MASTER
          <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
          </HeaderText>
            <div>
              Welcome, 
              <Link to="/updateuser" className="btn-flat waves-effect">
                    {this.props.auth.user.firstName}
              </Link>
            </div>
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
      <DashboardTasks>
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
      </DashboardTasks>
      <Footer>GWBootcamp <br/> Abeer Ishtiaq ✨ Sean Stubbs ✨ Athena Olson <br/> Copyright 2019 </Footer> 
      </BodyWrapper>
      </div>
      
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(mapStateToProps, {setCurrentUser,logoutUser})(Dashboard);
