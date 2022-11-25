import React from 'react';
import logo from './logo.svg';
import './App.css';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProblemList from './components/ProblemList'
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import axios from "axios"
import { Button } from '@mui/material/Button';

function App() {
  const [token, setToken] = useState(localStorage.getItem("Token"))
  const [user, setUser] = useState(token !== null ? jwtDecode(token):false);

  const handleCallbackResponseGoogle = async (response) => {
    var userCallback = jwtDecode(response.credential);
    //try 
    var UserResponse = await axios.post('https://opobackend.azurewebsites.net/api/Users', { Name: userCallback.name, GoogleId: userCallback.sub, Token: response.credential })
    localStorage.setItem("Token",response.credential)
    // catch this is where we end up if we send ba token
    // var test = await axios.get('https://localhost:7057/api/Users')
    console.log({UserResponse, userCallback})
    return setUser(UserResponse);
  }

  const handleSignOut = () => {
    localStorage.removeItem("Token");
    setToken(false);
    setUser(false);
  }
  
  useEffect(() => {
    console.log("CURRENT USER IS: ", user)
        google.accounts.id.initialize({
      client_id: "1061925551073-28j75e6a29ukrfosq7otehkbe05auqj3.apps.googleusercontent.com",
      callback: handleCallbackResponseGoogle
    })



    if (user === false) {
      console.log("WE ARE NOT IN")
         /* global google */

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    }

  }, [user])

  return (
    <div className="App">
     
        {/*<NavBar/>*/}
          <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
                {token === false || user === false && <div className="signInDiv"></div>}
                {user !== false && <button onClick={handleSignOut}>Sign Out</button> }
                {user === false ? <HomePage /> : <ProblemList />}
          </>
          }></Route>
          {/* <Route path="/user" element={</>}></Route> */}
          {/*<Route path="/search" element={<SearchResult params={params} setParams={setParams} />}></Route>*/}
          {/*<Route path="/about" element={<About/>}></Route>*/}
        </Routes>
      {/*<Footer/>*/}
    </div>
    </BrowserRouter>
      {/*<Footer />*/}
    </div>
  );
}

export default App;
