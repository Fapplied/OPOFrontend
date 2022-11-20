import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {

  // const [weather, setWeather] = useState(null);

  useEffect(() => {
    
    const test = async () => {
      const test = await axios.get("https://opobackend.azurewebsites.net/WeatherForecast").then((res)=>console.log(res.data))
    }
    test();
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
