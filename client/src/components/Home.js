import React from "react";
import { ThemeProvider } from 'styled-components';
import { HeaderText, HeaderWrapper } from "./HeaderStatic";

const theme = {
    font: "Abel, sans-serif"
};

export default () => (
    <ThemeProvider theme={theme}>
        <HeaderWrapper>
            <HeaderText>App Name</HeaderText>
        </HeaderWrapper>
    </ThemeProvider>
);



