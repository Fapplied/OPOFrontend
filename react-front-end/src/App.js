import React from 'react';
import logo from './logo.svg';
import './App.css';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProblemList from './components/ProblemList'
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState({})

  const handleCallbackResponseGoogle = (response) => {
    console.log({rawToken: response.credential})
    const user = jwtDecode(response.credential);
    console.log({user})
    return setUser(user);
  }


  // const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //  /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "1061925551073-28j75e6a29ukrfosq7otehkbe05auqj3.apps.googleusercontent.com",
  //     callback: handleCallbackResponseGoogle
  //   })
  //
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme: "outline", size: "large" }
  //   );
  // },[])

  return (
    <div className="App">

        <NavBar/>
          <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProblemList/>}></Route>
          <Route path="/search" element={<SearchResult params={params} setParams={setParams} />}></Route>
          <Route path="/about" element={<About/>}></Route>
        </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
