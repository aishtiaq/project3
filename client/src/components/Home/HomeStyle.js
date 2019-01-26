import styled from "styled-components";

export const BodyWrapper = styled.body`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
  " headerwrapper headerwrapper headerwrapper headerwrapper headerwrapper headerwrapper"
  " . logocontainer logocontainer logocontainer logocontainer . "
  " footer footer footer footer footer footer ";
  background-color: #F6F6F6;
  width: 100%;
  height: auto;
  position: absolute;
`;

export const HeaderWrapper = styled.div`
  grid-area: headerwrapper;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
  " headertext headertext headertext headertext link1 link2 ";
  background-color: #eaeaea;
  border-bottom: black solid 1px;
  box-shadow: 0 0 10px #33363b;
  @media (max-width: 768px){
  grid-template-areas:
  " headertext headertext headertext headertext headertext headertext "
  " . . link1 link1 . . "
  " . . link2 link2 . . "
  };
`;

export const HeaderText = styled.h1`
  font-family: ${props => props.theme.font};
  grid-area: headertext;
  color: #33363b;
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

export const WelcomeMessage = styled.div`
  color: #33363b;
  font-size: 23px;
  font-family: 'Varela Round', sans-serif, cursive;
  padding-top: 77px;
  text-align: right;
  @media (max-width: 832px){
    padding-top: 0;
    padding-bottom: 10px;
    margin-left: -15px;
    text-align: center;
    grid-column: 2 / 6;
    width: 250px;
  };
  `;

export const Link1 = styled.div`
grid-area: link1;
margin: 0;
font-family: 'Abel', sans-serif;
font-weight: bolder;
padding-top: 80px;
text-align: right;
width: 160px;
letter-spacing: 2px;
font-size: 20px;
margin-left: 200px;
transition-duration: 0.5s;
:hover {
  font-size: 23px;
  transition-timing-function: ease-in-out;
}
  @media (max-width: 832px){
    margin: auto;
    padding-top: 0;
    padding-bottom: 10px;
    margin-left: -35px;

  };
`;

export const Link2 = styled.div`
grid-area: link2;
margin: 0;
font-family: 'Abel', sans-serif;
font-weight: bolder;
padding-top: 80px;
width: 150px;
letter-spacing: 2px;
font-size: 20px;
margin-left: 30px;
transition-duration: 0.5s;
:hover {
  font-size: 23px;
}
  @media (max-width: 832px){
    margin: auto;
    padding-top: 0;
    padding-bottom: 10px;
    margin-left: -15px;
    width: 160px;
    text-align: center;
  };
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
  @media (max-width: 832px){
    font-size: 15px;
  };
`;

export const RegisterLogin = styled.div`
  grid-area: registerlogin;
  grid-column: 3 / 6;
  grid-row: 2 / 4;
  overflow: auto;
  font-family: 'Varela Round', sans-serif, cursive;
    @media (max-width: 832px){
      grid-column: 1 / 7;
      grid-row: 2 / 4;
      overflow: scroll;
    };
`;

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

export const TabStyle = styled.div`
  color: yellowgreen;
  background-color: #33363b;
  font-family: 'Varela Round', sans-serif, cursive;
  font-size: 20px;
`;  

