import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from './ReactComponents/UserProfile';
import Registration from './ReactComponents/Registration';
import MainView from './ReactComponents/MainView';
import Login from './ReactComponents/Login';
import CreateGroup from './ReactComponents/createGroup/CreateGroup';
import GroupPage from './ReactComponents/GroupView/GroupPage';
import AddPost from './ReactComponents/GroupView/AddPost';
import Chat from './ReactComponents/ChatRoom/Chat';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route exact path="/groups/:groupName" component={GroupPage} />
          <Route path="/groups/:groupId/post" component={AddPost} />
          <Route path="/groups" component={MainView} />
          {/* <Route path=":groupName" />
            <Route /> */}
          <Route exact path="/user/:username" component={UserProfile} />
          <Route exact path="/createGroup" component={CreateGroup} />
          {/* <Route exact path="/cis557" component={GroupPage} /> */}
          <Route path="/chat/:friendName" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
