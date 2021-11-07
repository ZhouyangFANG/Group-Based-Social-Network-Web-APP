import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  UserProfile, Registration, MainView, Login, CreateGroup,
} from './ReactComponents';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/groups" component={MainView} />
          <Route exact path="/user" component={UserProfile} />
          <Route exact path="/createGroup" component={CreateGroup} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
