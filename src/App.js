import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header';

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Registered, setRegistered] = useState(false);
  // const nameEl = React.useRef(null);
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleRegister = () => {
      if (!name.match(/^[a-z0-9]+$/i)) {
        alert('Invalid Name!');
        setName("");
      } else {
        setRegistered(true);
      }
  };

  const handleDelete = () => {
      setName("");

  };

  return (
    <div>
      <h1>YYDS</h1>
      { !Registered ? 
      
          <form>
              <fieldset>
                <legend>Registration</legend>
                <label>
                    User Name
                    <input type="text" placeholder="Joe" value={name} onChange={handleNameChange}/><br/>
                    Email
                    <input type="text" placeholder="joe@me.com" value={email} onChange={handleEmailChange}/><br/>
                    Password
                    <input type="text" placeholder="123456" value={password} onChange={handlePasswordChange}/><br/>
                    <input type="submit" value="Register" onClick={handleRegister}/>
                </label>
              </fieldset>
          </form>
        : (
          <div>
            {/* <Frame/> */}
          </div>
        )}
    </div>
  );
}
export default App;

