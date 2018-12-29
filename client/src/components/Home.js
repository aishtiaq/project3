import React from "react";
import { ThemeProvider } from 'styled-components';
import { HeaderText, HeaderWrapper, LoginButton } from "./HeaderStatic";
import Login from "./Login";
import { CatchPhrase, BodyWrapper } from "../components/HomeBody";
import { injectGlobal } from 'styled-components';


const theme = {
    font: "Abel, sans-serif",
};

export default () => (
    <ThemeProvider theme={theme}>
        <HeaderWrapper>
            <HeaderText>Task Master</HeaderText>
            <LoginButton>Log In/Register</LoginButton>
            <Login></Login>
            <BodyWrapper>
                <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
            </BodyWrapper>
        </HeaderWrapper>
        
    </ThemeProvider>
    
);






