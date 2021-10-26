import './App.css';
import React, { useState, useEffect } from 'react';

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
  const haveAccount = () => {
    setRegistered(true);
  }

  const handleNoAccount = () => {
    setRegistered(false);

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
                    <input type="submit" value="Register" onClick={handleRegister}/><br/>
                    <input type="submit" value="Already have an account" onClick={haveAccount}/>
                </label>
              </fieldset>
          </form>
        : (
          <form>
              <fieldset>
                <legend>Login</legend>
                <label>
                    User Name/Email
                    <input type="text" placeholder="Joe / joe@me.com" value={email} onChange={handleEmailChange}/><br/>
                    Password
                    <input type="text" placeholder="123456" value={password} onChange={handlePasswordChange}/><br/>
                    <input type="submit" value="Login" onClick={handleRegister}/>
                    <input type="submit" value="I don't have an account yet" onClick={handleNoAccount}/>
                </label>
              </fieldset>
          </form>
        )}
    </div>
  );
}
export default App;

