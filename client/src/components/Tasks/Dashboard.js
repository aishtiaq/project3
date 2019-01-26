import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Lists from "./Lists";
import "react-tabs/style/react-tabs.css";
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Footer, DashboardTasks, TabStyle, WelcomeMessage, Link2 } from "../Home/HomeStyle";
import { setCurrentUser,logoutUser } from "../../actions/authActions";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";


const theme = {
    font: "Abel, sans-serif",
  };

const dStyle = {
  flex: '1'
}
  
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
          <HeaderText>TASK MASTER <i className="fas fa-cog fa-sm fa-spin"></i>
          <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
          </HeaderText>
             <WelcomeMessage>
             Welcome, &nbsp;
             <Link to="/updateuser" className="btn-flat waves-effect">
                   {this.props.auth.user.firstName}
             </Link>
             </WelcomeMessage>
             <Link2>
              <Link
                  to="/login"
                  onClick={this.handleLogout}
                >
                  LOGOUT <i class="fas fa-sign-out-alt"></i>
              </Link>
              </Link2>
      </HeaderWrapper>
      
      <DashboardTasks style={dStyle}>
        <Tabs>
        <TabList>
          <TabStyle>
          <Tab>My Tasks</Tab>
          
          <Tab>Team Tasks</Tab>
          </TabStyle>
        </TabList>
        <TabPanel>
          <Lists whichList={this.props.auth.user.id} />
        </TabPanel>
        <TabPanel>
         <Lists whichList="team"/>
        </TabPanel>
      </Tabs>
      </DashboardTasks>
      <Footer>GWBootcamp <br/> ABEER ISHTIAQ ✨ SEAN STUBBS ✨ ATHENA OLSON <br/> Copyright© 2019 </Footer> 
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
