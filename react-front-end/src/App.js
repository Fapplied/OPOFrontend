import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProblemList from './components/ProblemList'

function App() {
  const [user, setUser] = useState({})

  const handleCallbackResponseGoogle = (response) => {
    var user = jwtDecode(response.credential);
    console.log({user})
    return setUser(user);
  }


  // const [weather, setWeather] = useState(null);

  useEffect(() => {
   /* global google */
    google.accounts.id.initialize({
      client_id: "1061925551073-28j75e6a29ukrfosq7otehkbe05auqj3.apps.googleusercontent.com",
      callback: handleCallbackResponseGoogle
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id="signInDiv"></div>
        
        <ProblemList/>
        <p>
          Edit
          <code>src/App.js</code>
          and save to reload. OPO.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
