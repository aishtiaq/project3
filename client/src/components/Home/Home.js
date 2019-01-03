import React from "react";
import { ThemeProvider } from 'styled-components';
import { HeaderText, HeaderWrapper, LoginButton } from "./HeaderStatic";
import { CatchPhrase, BodyWrapper } from "./HomeBody";
import { Link } from "react-router-dom";

const theme = {
    font: "Abel, sans-serif",
};

export default () => (
    <ThemeProvider theme={theme}>
    <div>
        <HeaderWrapper>
            <HeaderText>Task Master</HeaderText>
            {/* <LoginButton>Log In/Register</LoginButton> */}
            {/* <Login></Login> */}
            <div className="float-right">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn mx-2 btn-primary"
              >
                Register
              </Link>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn mx-2 btn-primary"
              >
                Log In
              </Link>
              </div>  
            
        </HeaderWrapper>
        <BodyWrapper>
                <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
        </BodyWrapper>
    </div>
    </ThemeProvider>
    
);






