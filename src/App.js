import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import UserProfile from './userProfile';

function App() {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login}/>
        <Route exact path="/user" component={UserProfile}/>
      </div>
    </Router>
  );
}
export default App;

