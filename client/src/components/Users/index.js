import React from 'react';
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from 'styled-components';
import {editUser} from '../../actions/userActions';
import {setCurrentUser} from '../../actions/authActions';
import { ThemeProvider } from 'styled-components';
import "../Tasks/Validate.css";
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Button, Link1, Link2, Footer, RegisterLogin } from "../Home/HomeStyle";

const theme = {
    font: "Abel, sans-serif",
  };



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
            password.classList.remove('active');
            password.classList.add('invalid');
            confirmPassword.classList.remove('active');
            confirmPassword.classList.add('invalid');
            return false;
        } else if (!(password.value === confirmPassword.value)) {
            passErr.textContent = `Please confirm password's match`;
            confPassErr.textContent=`Please confirm password's match`;
            password.classList.remove('active');
            password.classList.add('invalid');
            confirmPassword.classList.remove('active');
            confirmPassword.classList.add('invalid');
            return false;
        }
    
        error.textContent = '';
        return true;
      }

    render() {
        return (
            <ThemeProvider theme={theme}>
      <div>
            <BodyWrapper>
            <HeaderWrapper>
            <HeaderText>TASK MASTER <i className="fas fa-cog fa-sm fa-spin"></i>
            <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
            </HeaderText>
            <Link1>
              <Link
              to="/mydashboard"
            >
              DASHBOARD <i class="fas fa-columns"></i>
            </Link>
            </Link1>
            <Link2>
              <Link
              to="/login"
              onClick={this.handleLogout}
            >
              LOGOUT <i class="fas fa-sign-out-alt"></i>
            </Link>
            </Link2>
            
            </HeaderWrapper>
            <RegisterLogin>
            <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col-md-8 offset-s2">
                
                <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                
                    <h4>User Profile</h4>
                </div>
                    
                    <form noValidate onSubmit={this.onSubmit}>

                        <div className="form-group col-md-12">
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
                        <div className="form-group col-md-12">
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
                        <div className="form-group col-md-12">
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
                        <div className="form-group col-md-12">
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
                       
                        <div className="form-group col-md-12">
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
                        <div className="form-group col-md-12">
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
                        <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                        <button

                            style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem",
                            marginBottom: "1.5rem",
                            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                            }}

                            type="submit"                            

                            className="btn btn-primary waves-effect waves-light"
                        >
                            <div>Submit &#8594; </div>
                        </button>
                        
                        </div>
                        
                    </form>
                  </div>
                  </div>
            </div>
            </RegisterLogin>
            <Footer>GWBootcamp <br/> ABEER ISHTIAQ ✨ SEAN STUBBS ✨ ATHENA OLSON <br/> Copyright© 2019 </Footer>
            </BodyWrapper>
            </div>
          </ThemeProvider>
        
        );
  }

}

const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth
  });
  
export default connect(mapStateToProps, {editUser, setCurrentUser})(User);


