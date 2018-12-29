import styled from "styled-components";

export const HeaderText = styled.h1`
  font-family: ${props => props.theme.font};
  font-size: 50px;
`;

export const HeaderWrapper = styled.div`
    margin-right: auto;
    margin-left: auto;
    max-width: auto;

    height: 50px;

    /* padding-right: 10px;
    padding-left: 10px; */

    border: 5px solid red;
`;

