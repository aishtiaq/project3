import React from "react";
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, LoginButton, Footer, AnimateLogo } from "./HomeStyle";
// import { BodyWrapper } from "./HomeBody";
import { Link } from "react-router-dom";

const theme = {
    font: "Abel, sans-serif",
};

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <BodyWrapper>
        <HeaderWrapper>
          <HeaderText>TASK MASTER
            <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
          </HeaderText>
            <LoginButton>
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
                  letterSpacing: "1.5px",
                }}
                className="btn mx-2 btn-primary"
              >
                Log In
              </Link>
            </LoginButton>
          </HeaderWrapper>
        <AnimateLogo className="custom-animate">css animate goes here</AnimateLogo>
        <Footer>GWBootcamp <br/> Abeer Ishtiaq ✨ Sean Stubbs ✨ Athena Olson <br/> Copyright 2019 </Footer> 
      </BodyWrapper>
    </div>
    </ThemeProvider>
);





