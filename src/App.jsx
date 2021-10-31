import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import SignIn from './SignIn';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/registration" component={SignUp}/>
          <Route exact path="/user" component={UserProfile}/>
        </Switch>
      </div>
    </Router>
  );
}
export default App;

