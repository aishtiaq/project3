import React, { Component } from "react";
import { Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

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
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);

        this.props.loginUser(userData);
        // API.postUserLogin(userData)
        //   .then(res => console.log(res.data))
        //   .catch(err => console.log(err));

        // window.location.replace("/mydashboard");
    };

    render() {
        const { errors } = this.state;
    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col-md-8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                  Back to home
                </Link>
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
                      error={errors.email}
                      className="form-control"
                      placeholder="test@test.com"
                      id="email"
                      type="email"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      className="form-control"
                      id="password"
                      type="password"
                    />
                  </div>
                  <div className="col-md-12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-danger waves-effect waves-light"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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


