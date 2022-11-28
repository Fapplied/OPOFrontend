import logo from "../OPOlogo.jpg";
import "../App.css";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { removeLS, getLS, setLS } from "../helpers/storage";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import endpoints from "../helpers/endpoints";

const NavBar = ({ setUser, user }) => {
  const handleCallbackResponseGoogle = async (response) => {
    var localTokenData = jwtDecode(response.credential);
    var backendResponse = await endpoints.registerUser(
      localTokenData.name,
      localTokenData.sub,
      response.credential
    );
    console.log({ backendResponse });
    setLS("User", localTokenData); // google info
    setLS("User2", backendResponse.data); // contains our user info with its own userid
    setLS("Token", response.credential); // raw token that should be send for sensitive requests
    return setUser(backendResponse);
  };

  const handleSignOut = () => {
    removeLS("User");
    removeLS("Token");
    removeLS("User2");
    setUser(false);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1061925551073-28j75e6a29ukrfosq7otehkbe05auqj3.apps.googleusercontent.com",
      callback: handleCallbackResponseGoogle,
    });
    /* global google */
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "small",
    });
  }, [user]);

  return (
    <>
      <nav className="navBar">
        <img
          className="Logo"
          src={logo}
          width="100px"
          height="100px"
          alt="logo"
        />
        <ul className="nav__ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            {user === false && <div id="signInDiv"></div>}
            {user !== false && (
              <button onClick={handleSignOut}>Sign Out</button>
            )}
          </li>
        </ul>
        <hr></hr>
      </nav>
    </>
  );
};

export default NavBar;
