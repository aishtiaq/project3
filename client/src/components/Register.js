import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

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

    loadUsers = () => {
      API.getRegisteredUsers()
        .then(res=>
            console.log(res.data)
          //this.setState({ firstName: "", lastName: "", email: "", phone: "", password: "", password2: "" })
          )
          .catch(err => console.log(err));
    };

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
            password: this.state.password,
            password2: this.state.password2
        };
        if (newUser.password === newUser.password2) {
          console.log(newUser);
          API.postRegisteredUser(newUser)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
          } else {
            alert("Please confirm your password matches.")
        };
        window.location.replace("/");
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
              <div className="row">
                <div className="col s8 offset-s2">
                  <Link to="/" className="btn-flat waves-effect">
                    Back to home
                  </Link>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                      <b>Register</b> below
                    </h4>
                    <p className="grey-text text-darken-1">
                      Already have an account? <Link to="/login">Log in</Link>
                    </p>
                  </div>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.firstName}
                        error={errors.firstName}
                        id="firstName"
                        type="text"
                      />
                      <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.lastName}
                        error={errors.lastName}
                        id="lastName"
                        type="text"
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.phone}
                        error={errors.phone}
                        id="phone"
                        type="text"
                      />
                      <label htmlFor="phone">Phone #</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                      />
                      <label htmlFor="password2">Confirm Password</label>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                      <button
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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
      export default Register;

    



