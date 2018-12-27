import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyDashboard from "./components/MyDashboard";
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div>
       
        <Switch>
          <Route exact path="/mydashboard" component={MyDashboard} />
          
        </Switch>
      </div>
    </Router>
    </Provider>
    
  );
}

export default App;