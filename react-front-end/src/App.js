import React from 'react';
import logo from './logo.svg';
import './App.css';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProblemList from './components/ProblemList'
import Footer from "./components/Footer";
import axios from "axios"

function App() {
  const [user, setUser] = useState({})

  const handleCallbackResponseGoogle = async (response) => {
    var user = jwtDecode(response.credential);
    //try 
   var test = await axios.post('https://localhost:7057/api/Users', { Name:user.name, GoogleId:user.sub, Token: response.credential})
    // catch this is where we end up if we send ba token
    // var test = await axios.get('https://localhost:7057/api/Users')
    console.log({test})
    return setUser(user);
  }
  
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
      <div id="signInDiv"></div>
        {/*<NavBar/>*/}
          <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProblemList/>}></Route>
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
