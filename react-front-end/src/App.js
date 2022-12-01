import React from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import {getLS} from "./helpers/storage";
import UserProblems from "./components/UserProblems";
import Profile from "./components/Profile";
import NavigationMenu from "./components/NavigationMenu";

function App() {
  const [user, setUser] = useState(getLS("User2"));

  console.log({ user });

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavigationMenu setUser={setUser} user={user} />
          <Routes>
            <Route path="/" element={<HomePage user={user} />}></Route>
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
