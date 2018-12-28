import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyDashboard from "./components/MyDashboard";
import {Provider} from 'react-redux';
import store from './store';
import Registration from "./components/Registration";
import Login from "./components/Login";

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div>
       
        <Switch>
          <Route exact path="/mydashboard" component={MyDashboard} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
          
        </Switch>
      </div>
    </Router>
    </Provider>
    
  );
}

export default App;