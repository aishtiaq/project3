import React from 'react';
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import {editUser} from '../../actions/userActions';
import {setCurrentUser} from '../../actions/authActions';
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Button, Footer, RegisterLogin } from "../Home/HomeStyle";
import "../Tasks/Validate.css";

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
        console.log(this.props.auth.user);
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

        if (!(this.showFormErrors())) {
            console.log('form is invalid: do not submit');
        } else {
            console.log('form is valid: submit');
            console.log(newUser);
            this.props.editUser(newUser);
            
        };
            // window.location.replace("/");
    };

    showFormErrors() {
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;
        
        inputs.forEach(input => {
          input.classList.add('active');
          
          const isInputValid = this.showInputError(input.id);
          
          if (!isInputValid) {
            isFormValid = false;
          }
        });
    
        return isFormValid;
      }

    showInputError(refName) {
        // const validity = this.refName.validity;
        const field = document.getElementById(refName);
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('password2');
        const passErr = document.getElementById('passwordError');
        const confPassErr = document.getElementById('password2Error');
        
        console.log("password: "+password);
        console.log("password value: "+password.value);
        
        if ((field.value == "")) {
          error.textContent = `${label} is a required field`; 
          return false;
        } else {
            error.textContent = "";
        }

        if (!(password.value.length > 4)) {
            passErr.textContent = `Password must contain 4 characters`;
            confPassErr.textContent= `Password must contain 4 characters`;
            return false;
        } else if (!(password.value === confirmPassword.value)) {
            passErr.textContent = `Please confirm password's match`;
            confPassErr.textContent=`Please confirm password's match`;
            return false;
        }
    
        error.textContent = '';
        return true;
      }

    render() {
        return (
            <BodyWrapper>
            <HeaderWrapper>
            <HeaderText>TASK MASTER
            <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
            </HeaderText>
            <Button>
              <Link
              to="/mydashboard"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn mx-2 btn-primary"
            >
              Dashboard
            </Link>
            
              <Link
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
            </Link>
            </Button>
            </HeaderWrapper>
            <RegisterLogin>
            <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col-md-8 offset-s2">
                
                <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                
                    <h4>User Profile</h4>
                </div>
                    
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group col-md-6">
                        <label id="firstNameLabel" htmlFor="firstName">First Name</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.firstName}
                            // error={errors.firstName}
                            className="form-control validate"
                            placeholder="First"
                            id="firstName"
                            type="text"
                            required
                        />
                        </div>
                        <div id="firstNameError" className="firstNameError error"></div>
                        <div className="form-group col-md-6">
                        <label id="lastNameLabel" htmlFor="lastName">Last Name</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.lastName}
                            // error={errors.lastName}
                            className="form-control validate"
                            placeholder="Last"
                            id="lastName"
                            type="text"
                            required
                        />
                        </div>
                        <div id="lastNameError" className="lastNameError error"></div>
                        <div className="form-group col-md-6">
                        <label id="emailLabel" htmlFor="email">Email</label>
                        <input disabled
                            // onChange={this.onChange}
                            value={this.state.email}
                            // error={errors.email}
                            className="form-control validate"
                            // placeholder="test@test.com"
                            id="email"
                            type="email"
                        />
                        </div>
                        <div id="emailError" className="emailError error"></div>
                        <div className="form-group col-md-6">
                        <label id="phoneLabel" htmlFor="phone">Phone #</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.phone}
                            // error={errors.phone}
                            className="form-control validate"
                            placeholder="XXXXXXXXXX"
                            id="phone"
                            type="text"
                            required
                        />
                        </div>
                        <div id="phoneError" className="phoneError error"></div>
                        <div className="form-group col-md-6">
                        <label id="passwordLabel" htmlFor="password">Password</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            // error={errors.password}
                            className="form-control validate"
                            placeholder="*********"
                            id="password"
                            type="password"
                            required
                        />
                        </div>
                        <div id="passwordError" className="passwordError error"></div>
                        <div className="form-group col-md-6">
                        <label id="password2Label" htmlFor="password2">Confirm Password</label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            // error={errors.password2}
                            className="form-control validate"
                            placeholder="*********"
                            id="password2"
                            type="password"
                            required
                        />
                        </div>
                        <div id="password2Error" className="password2Error error"></div>
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
                  </div>
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


