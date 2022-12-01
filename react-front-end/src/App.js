import React from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import {getLS} from "./helpers/storage";
import UserProblems from "./components/UserProblems";
import Profile from "./components/Profile";
import NavigationMenu from "./components/NavigationMenu";
import {Helmet} from "react-helmet";

function App() {
  const [user, setUser] = useState(getLS("User2"));

  console.log({ user });

  return (
    <>
      <Helmet>
        <title> OPO - Other Peoples Opinion</title>
        <meta name="description" content="Social media network to get other peoples opinion" />
        <meta charSet="utf-8" />
        <meta name="author" content="Camille, Rinaldo and Felix"/>
        
        
      </Helmet>
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
