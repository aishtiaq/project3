import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
      // If logged in and user navigates to Register page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/mydashboard");
      }
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
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
            password: this.state.password
        };
        if (newUser.password === this.state.password2) {
          console.log(newUser);
          this.props.registerUser(newUser, this.props.history);
          // API.postRegisteredUser(newUser)
          //   .then(res => console.log(res.data))
          //   .catch(err => console.log(err));
          // } else {
          //   alert("Please confirm your password matches.")
        };
        // window.location.replace("/");
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-s2">
                  <Link to="/" className="btn-flat waves-effect">
                    Back to home
                  </Link>
                  <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                      <b>Register</b> below
                    </h4>
                    <p className="grey-text text-darken-1">
                      Already have an account? <Link to="/login">Log in</Link>
                    </p>
                  </div>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group col-md-12">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.firstName}
                        error={errors.firstName}
                        className="form-control"
                        placeholder="First"
                        id="firstName"
                        type="text"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.lastName}
                        error={errors.lastName}
                        className="form-control"
                        placeholder="Last"
                        id="lastName"
                        type="text"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="email">Email</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        className="form-control"
                        placeholder="test@test.com"
                        id="email"
                        type="email"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="phone">Phone #</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.phone}
                        error={errors.phone}
                        className="form-control"
                        placeholder="XXXXXXXXXX"
                        id="phone"
                        type="text"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="password">Password</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        className="form-control"
                        placeholder="*********"
                        id="password"
                        type="password"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="password2">Confirm Password</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        className="form-control"
                        placeholder="*********"
                        id="password2"
                        type="password"
                      />
                    </div>
                    <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
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
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        );
    };
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));

    



