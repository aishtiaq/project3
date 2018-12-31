import axios from "axios";

export default {
  //Get all registered users
  getRegisteredUsers: function() {
      return axios.get("/api/users/register");
  },
  //Post new user registration
  postRegisteredUser: function(regData) {
      return axios.post("/api/users/register", regData)
  },
  //Get user login
  getUserLogin: function() {
      return axios.get("/api/users/login");
  },
  //Post user login
  postUserLogin: function(userLogin) {
      return axios.post("/api/users/login", userLogin)
  }

};
