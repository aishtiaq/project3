import styled from "styled-components";

export const BodyWrapper = styled.body`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, minmax(175px, auto));
  background-color: #2C3531;
`;

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-column: 1 / 7;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px;
  border-radius: 5px;
  background-color: #116466;
`;

export const HeaderText = styled.h1`
  font-family: ${props => props.theme.font};
  grid-column: 1 / 6;
  grid-row: 1 / 2;
  color: #FFCB9A;
  background-color: #116466;
  font-size: 45px;
  font-weight: bold;
  text-align: left;
  margin-left: 100px;
  margin-top: 25px;
`;

export const CatchPhrase = styled.h4`
  font-family: 'Varela Round', sans-serif, cursive;
  grid-column: 1 / 6;
  grid-row: 1 / 2;
  font-size: 25px;
  text-align: left;
  color: #D1D8E2;
  letter-spacing: 3px;
  margin-top: 10px;
  /* border: black solid 2px; */
`;

export const Button = styled.div`
  grid-column: 6 / 7;
  grid-row: 1 / 2;
  justify-items: right;
  display: inline;
  padding-top: 80px;
  /* border: black solid 2px; */
`;

export const AnimateLogo = styled.div`
  font-family: ${props => props.theme.font};
  grid-column: 2 / 6;
  grid-row: 2 / 6;
  font-size: 40px;
  margin: 50px 0 50px 0;
  text-align: center;
  color: whitesmoke;
  border: black solid 2px;
`;

export const Footer = styled.div`
  font-family: ${props => props.theme.font};
  font-size: 20px;
  color: #2C3531;
  text-align: center;
  background-color: #D9B08C;
  grid-column: 1 / 7;
  grid-row: 6 / 7;
  padding-top: 20px;
  padding-bottom: 20px;
  line-height: 30px;
  margin-top: 150px;
`;
