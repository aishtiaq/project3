import axios from "axios";

export default {
  //Get all registered users
  getRegisteredUsers: function() {
      return axios.get("/api/register");
  },
  //Post new user registration
  postRegisteredUser: function(regData) {
      return axios.post("/api/register", regData)
  },
  //Get user login
  getUserLogin: function() {
      return axios.get("/api/login");
  },
  //Post user login
  postUserLogin: function(userLogin) {
      return axios.post("/api/login", userLogin)
  }

};
