import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';
import Registration from './Registration';
import MainView from './ReactComponents/MainView'
import Login from './Login';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration}/>
          <Route path="/groups" component={MainView} />
          <Route exact path="/user" component={UserProfile}/>
        </Switch>
      </div>
    </Router>
  );
}
export default App;

