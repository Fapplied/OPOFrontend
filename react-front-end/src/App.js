import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import { Button } from "@mui/material/Button";
import { setLS, getLS, removeLS } from "./helpers/storage";
import endpoints from "./helpers/endpoints";
import NavBar from "./components/NavBar";
import UserProblems from "./components/UserProblems";
import Profile from "./components/Profile";

function App() {
  const [user, setUser] = useState(getLS("User2"));

  console.log({ user });

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavBar setUser={setUser} user={user} />
          <Routes>
            <Route path="/" element={<>{<HomePage user={user} />}</>}></Route>
            <Route
              path="/profile"
              element={
                <>{user ? <><Profile user={user}/> <UserProblems user={user} /> </>: "Please sign in"}</>
              }
            ></Route>
          </Routes>
          {/*<Footer/>*/}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
