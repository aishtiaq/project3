import React from "react";
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Link1, Link2, Footer, AnimateLogo } from "./HomeStyle";
import { Link } from "react-router-dom";
import PersonInGear from "./GearsLogo";

const theme = {
    font: "Abel, sans-serif",
};

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <BodyWrapper>
        <HeaderWrapper>
          <HeaderText>TASK MASTER <i className="fas fa-cog fa-sm"></i>
            <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
          </HeaderText>
            <Link1>
              <Link
                to="/register"
                // style={{
                //   width: "140px",
                //   borderRadius: "3px",
                //   letterSpacing: "1.5px"
                // }}
                // className="btn mx-2 btn-primary"
              >
                REGISTER <i class="fas fa-user-plus"></i>
              </Link>
              </Link1>
              <Link2>
              <Link
                to="/login"
                // style={{
                //   width: "140px",
                //   borderRadius: "3px",
                //   letterSpacing: "1.5px",
                // }}
                // className="btn mx-2 btn-primary"
              >
                LOGIN <i class="fas fa-user-edit"></i>
              </Link>
              </Link2>
          </HeaderWrapper>
          <PersonInGear />
        <Footer>GWBootcamp <br/> ABEER ISHTIAQ ✨ SEAN STUBBS ✨ ATHENA OLSON <br/> Copyright© 2019 </Footer> 
      </BodyWrapper>
    </div>
    </ThemeProvider>
);






