import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProblemList from "./components/ProblemList";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import { Button } from "@mui/material/Button";
import { setLS, getLS, removeLS } from "./helpers/storage";
import endpoints from "./helpers/endpoints";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(getLS("User"));

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavBar setUser={setUser} user={user} />

          <Routes>
            <Route
              path="/"
              element={<>{user === false ? <HomePage /> : <ProblemList />}</>}
            ></Route>
            {/* <Route path="/user" element={</>}></Route> */}
            {/*<Route path="/search" element={<SearchResult params={params} setParams={setParams} />}></Route>*/}
            {/*<Route path="/about" element={<About/>}></Route>*/}
          </Routes>
          {/*<Footer/>*/}
        </div>
      </BrowserRouter>
      {/*<Footer />*/}
    </>
  );
}

export default App;
