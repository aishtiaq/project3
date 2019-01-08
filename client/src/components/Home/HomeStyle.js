import styled from "styled-components";

export const BodyWrapper = styled.body`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* grid-template-rows: repeat(9, minmax(100px, auto)); */
  grid-template-rows: minmax(150px, auto);
  grid-auto-flow: row;
  grid-template-areas:
  " headerwrapper headerwrapper headerwrapper headerwrapper headerwrapper headerwrapper"
  " . . logo logo . . "
  " footer footer footer footer footer footer";
  /* background-color: #2C3531; */
  background-color: whitesmoke;
  margin: 0;
  /* max-width: auto;
  max-height: auto; */
`;

export const HeaderWrapper = styled.div`
grid-area: headerwrapper;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
  " . headertext headertext headertext button button ";
  /* grid-template-rows: 1;
  grid-column: 1 / 13; */
  /* margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px; */
  /* border-radius: 5px; */
  background-color: #116466;
  @media (max-width: 768px){
  grid-template-areas:
  " headertext headertext headertext headertext headertext headertext "
  ". button button button button button";
  };
`;

export const HeaderText = styled.h1`
  font-family: ${props => props.theme.font};
  grid-area: headertext;
  /* grid-column: 2 / 7;
  grid-row: 1 / 2; */
  color: #FFCB9A;
  background-color: #116466;
  font-size: 45px;
  font-weight: bold;
  /* text-align: left; */
  /* margin-left: 100px; */
  margin-top: 25px;
  @media (max-width: 832px){
  text-align: center;
  padding: 0 3px 0 3px;
};
`;

export const CatchPhrase = styled.h4`
grid-area: catchphrase;
  font-family: 'Varela Round', sans-serif, cursive;
  /* grid-column: 2 / 7;
  grid-row: 1 / 2; */
  font-size: 25px;
  text-align: left;
  color: #D1D8E2;
  letter-spacing: 3px;
  margin-top: 10px;

  @media (max-width: 832px){
  text-align: center;
};

  /* border: black solid 2px; */
`;

export const Button = styled.div`
grid-area: button;
margin: 0;
padding: 0;
  /* grid-column: 9 / 12;
  grid-row: 1 / 2; */
  /* justify-items: right;
  display: inline; */
  padding-top: 80px;
  /* border: black solid 2px; */
`;

export const AnimateLogo = styled.div`
  font-family: ${props => props.theme.font};
  grid-area: logo;
  /* grid-column: 5 / 9;
  grid-row: 2 / 6; */
  font-size: 40px;
  margin: 50px 0 50px 0;
  text-align: center;
  color: black;
  border: black solid 2px;
  height: 500px;
`;

export const Footer = styled.div`
  font-family: ${props => props.theme.font};
  grid-area: footer;
  font-size: 20px;
  color: #2C3531;
  text-align: center;
  background-color: #D9B08C;
  /* grid-column: 1 / 7;
  grid-row: 6 / 7; */
  padding-top: 20px;
  padding-bottom: 20px;
  line-height: 30px;
  margin-top: 190px;
`;
