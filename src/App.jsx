import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './ReactComponents/UserProfile';
import Registration from './ReactComponents/Registration';
import MainView from './ReactComponents/MainView';
import Login from './ReactComponents/Login';
import CreateGroup from './ReactComponents/createGroup/CreateGroup';
import GroupPage from './ReactComponents/GroupView/GroupPage';
import UserSendMesg from './ReactComponents/UserMsg/UserSendMesg';
import UserReceivedMesg from './ReactComponents/UserMsg/UserReceivedMsg';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/groups/:groupName" component={GroupPage} />
          <Route path="/groups" component={MainView} />
          {/* <Route path=":groupName" />
            <Route /> */}
          <Route exact path="/user" component={UserProfile} />
          <Route exact path="/createGroup" component={CreateGroup} />
          {/* <Route exact path="/cis557" component={GroupPage} /> */}
          <Route exact path="/sendMesg" component={UserSendMesg} />
          <Route exact path="/receiveMesg" component={UserReceivedMesg} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
