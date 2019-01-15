import styled from "styled-components";

export const BodyWrapper = styled.body`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
  " headerwrapper headerwrapper headerwrapper headerwrapper headerwrapper headerwrapper"
  " . . logo logo . . "
  " footer footer footer footer footer footer";
  /* background-color: #cccccc; */
  background-color: #F6F6F6;
  /* background-color: #eaeaea; */
  /* margin: 0; */
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const HeaderWrapper = styled.div`
  grid-area: headerwrapper;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
  " headertext headertext headertext headertext button button ";
  background-color: #eaeaea;
  border-bottom: black solid 1px;
  box-shadow: 0 0 10px #33363b;
  @media (max-width: 768px){
  grid-template-areas:
  " headertext headertext headertext headertext headertext headertext "
  " . . button button button button ";
  };
`;

export const HeaderText = styled.h1`
  font-family: ${props => props.theme.font};
  grid-area: headertext;
  /* color: #454545; */
  color: #33363b;
  /* background-color: #116466; */
  /* background-color: #cccccc; */
  /* background-color: red; */
  letter-spacing: 1px;
  font-size: 45px;
  font-weight: 900px;
  margin-top: 25px;
  padding-left: 100px;
  @media (max-width: 832px){
  text-align: center;
  padding: 0 3px 0 3px;
};
`;

export const CatchPhrase = styled.h4`
grid-area: catchphrase;
  font-family: 'Varela Round', sans-serif, cursive;
  font-size: 25px;
  text-align: left;
  color: #7A9D96;
  letter-spacing: 2px;
  margin-top: 10px;

  @media (max-width: 832px){
  text-align: center;
};
`;

export const Button = styled.div`
grid-area: button;
margin: 0;
/* padding: 0; */
padding-top: 80px;
padding-right: 100px;
text-align: right;
@media (max-width: 832px){
  margin: auto;
  padding-top: 0;
  padding-bottom: 10px;
  margin-left: -15px;
};
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
  color: #7A9D96;
  text-align: center;
  background-color: #33363b;
  grid-row: 7 / 8;
  padding-top: 20px;
  padding-bottom: 20px;
  line-height: 30px;
  border-top: black solid 1px;
  box-shadow: 0 -8px 5px -5px #7A9D96;
`;

/* Register & Login pages - Body Style to hold the forms */

export const RegisterLogin = styled.div`
  grid-area: registerlogin;
  grid-column: 3 / 6;
  grid-row: 2 / 4;
  /* overflow: scroll; */
  @media (max-width: 832px){
    grid-column: 1 / 7;
    grid-row: 2 / 4;
    overflow: scroll;
  };

`;

/* Dashboard page - Body Style to hold the task lists */

export const DashboardTasks = styled.section`
  grid-column: 1 / 7;
  grid-row: 2 / 3;
  overflow: hidden;
  color: #254c69;
  background-color: white;
  margin-top: 10px;
  @media (max-width: 832px){
    grid-column: 1 / 7;
    grid-row: 2 / 4;
    overflow: scroll;
  };
`;    

// Styles tabs on Dashboard w/ font & color (TABS ONLY)
export const TabStyle = styled.div`
  color: yellowgreen;
  /* color: white; */
  background-color: #33363b;
  /* background-color: white; */
  font-family: 'Varela Round', sans-serif, cursive;
  font-size: 20px;
`;  

export const WelcomeMessage = styled.div`
  color: #33363b;
  `;
