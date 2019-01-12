import React from 'react';
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import {editUser} from '../../actions/userActions';
import {setCurrentUser} from '../../actions/authActions';
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Button, Footer, RegisterLogin } from "../Home/HomeStyle";


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: whitesmoke;
`;

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            userId: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // this.props.setCurrentUser();
        console.log(this.props.auth.user.firstName);
        this.setState({
            firstName: this.props.auth.user.firstName,
            lastName: this.props.auth.user.lastName,
            email: this.props.auth.user.email,
            phone: this.props.auth.user.phone,
            userId: this.props.auth.user.id,
            password: this.props.auth.user.password
        })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            userId: this.state.userId,
            password: this.state.password
        };
        if (newUser.password === this.state.password2) {
          console.log(newUser);
          this.props.editUser(newUser);
         
        };
        // window.location.replace("/");
    };

    render() {
        return (
            <BodyWrapper>
            <HeaderWrapper>
            <HeaderText>TASK MASTER
            <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
            </HeaderText>
            <Button>
              <button
              to="/mydashboard"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn mx-2 btn-primary"
            >
              Back to Home
            </button>
            </Button>
            <Button>
              <button
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              onClick={this.handleLogout}
              className="btn mx-2 btn-primary"
            >
              Logout
            </button>
            </Button>
            </HeaderWrapper>
            <RegisterLogin>
                <div style= {{marginLeft: "2rem"}}>
                    <h1>Update User Credentials</h1>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.firstName}
                            // error={errors.firstName}
                            className="form-control"
                            placeholder="First"
                            id="firstName"
                            type="text"
                        />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.lastName}
                            // error={errors.lastName}
                            className="form-control"
                            placeholder="Last"
                            id="lastName"
                            type="text"
                        />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            // error={errors.email}
                            className="form-control"
                            placeholder="test@test.com"
                            id="email"
                            type="email"
                        />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="phone">Phone #</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.phone}
                            // error={errors.phone}
                            className="form-control"
                            placeholder="XXXXXXXXXX"
                            id="phone"
                            type="text"
                        />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            // error={errors.password}
                            className="form-control"
                            placeholder="*********"
                            id="password"
                            type="password"
                        />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            // error={errors.password2}
                            className="form-control"
                            placeholder="*********"
                            id="password2"
                            type="password"
                        />
                        </div>
                        <div className="col-md-6" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem",
                            marginBottom: "1.5rem"
                            }}
                            type="submit"
                            className="btn btn-primary waves-effect waves-light"
                        >
                            Submit
                        </button>
                        </div>
                    </form>
                  </div>

            </RegisterLogin>
            <Footer>GWBootcamp <br/> Abeer Ishtiaq ✨ Sean Stubbs ✨ Athena Olson <br/> Copyright 2019 </Footer> 
            </BodyWrapper>
        
        );
  }

}

const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth
  });
  
export default connect(mapStateToProps, {editUser, setCurrentUser})(User);


