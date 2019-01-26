import React, { Component } from "react";
import { Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { ThemeProvider } from 'styled-components';
import { BodyWrapper, HeaderWrapper, HeaderText, CatchPhrase, Link2, Footer, RegisterLogin } from "../Home/HomeStyle";

const theme = {
  font: "Abel, sans-serif",
};



class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/mydashboard");
      }
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/mydashboard");
      }
  
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
      console.log(nextProps.errors);
      if(nextProps.errors.emailnotfound !== undefined) {
        document.getElementById("email").classList.add("is-invalid");
        document.getElementById("emailError").textContent = "Eamil Not Found";
      }
      if(nextProps.errors.passwordincorrect !== undefined) {
        document.getElementById("password").classList.add("is-invalid");
        document.getElementById("passwordError").textContent = "Incorrect Password";
      }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        document.getElementById("email").classList.remove("is-invalid");
        document.getElementById("password").classList.remove("is-invalid");
        document.getElementById("emailError").textContent = "";
        document.getElementById("passwordError").textContent = "";
      
        if(this.validate()) {
          const userData = {
              email: this.state.email,
              password: this.state.password
          };

          this.props.loginUser(userData);
          console.log("login didnt work");
          
          console.log(this.state.errors);

         
        }
    };

    validate= () => {

   
      var errors;
    
      if (this.state.email.length<=0) {
        errors = true;
        document.getElementById("email").classList.add("is-invalid");
        document.getElementById("emailError").textContent = "Eamil cannot be empty";
      }
    
      if (this.state.password.length<=0) {
        errors = true;
        document.getElementById("password").classList.add("is-invalid");
        document.getElementById("passwordError").textContent = "Password cannot be empty";
      }
    
      if (errors)     
        return false;
      else
        return true;
    }

    render() {

    return (
      <ThemeProvider theme={theme}>
      <div>
      <BodyWrapper>
        <HeaderWrapper>
          <HeaderText>TASK MASTER <i className="fas fa-cog fa-sm"></i>
           <CatchPhrase>Be Effective. Be On Time. Be Awesome.</CatchPhrase>
          </HeaderText>
          <Link2>
              <Link to="/">
                HOME 
                <i class="fas fa-home"></i>
              </Link>
          </Link2>
        </HeaderWrapper>
          
        <RegisterLogin>
         <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col-md-8 offset-s2">
                
                <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Login</b> below
                  </h4>
                  <p className="grey-text text-darken-1">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group col-md-12">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      className="form-control"
                      placeholder="xxxx@xxxx.xxx"
                      id="email"
                      type="email"
                    />
                    <div id="emailError" className="invalid-feedback"></div>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      className="form-control"
                      placeholder="********"
                      id="password"
                      type="password"
                    />
                    <div id="passwordError" className="invalid-feedback"></div>
                  </div>
                  <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                      }}
                      type="submit"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      <div>Login &#8594; </div>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps,{ loginUser })(Login);


