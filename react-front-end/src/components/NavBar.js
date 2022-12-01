// import logo from "../OPOlogo.jpg";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { removeLS, getLS, setLS } from "../helpers/storage";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import endpoints from "../helpers/endpoints";
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ setUser, user }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  
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


  function toggleNav() {
    if (menuVisible === false) {
      setMenuVisible(true)
    } else {
      setMenuVisible(false)
    }
  }
  
  function closeNav () {
    setMenuVisible(false)
  }
  
  function logOutButton () {
    handleSignOut()
    closeNav()
  }

  return (
    <div >
      <button className="menuButton" onClick={toggleNav}>
        {user !== false ? "Menu" : "LogIn"}
        {/*<img*/}
        {/*  className="Logo"*/}
        {/*  src=""*/}
        {/*  width="100px"*/}
        {/*  height="100px"*/}
        {/*  alt="logo"*/}
        {/*/>*/}
      </button>
      <nav className="navBar" style={{display: menuVisible === true ? "block":"none"}}>
        <ul className="navBar--ul">
          <li>
            {user !== false && <Link to="/" onClick={closeNav}>Home</Link>}
          </li>
          <li>
            {user !== false && <Link to="/profile" onClick={closeNav}>Profile</Link>}
          </li>
          <li>
            {user === false && <div id="signInDiv"></div>}
            {user !== false && (
              <button onClick={logOutButton} >Sign Out</button>
            )}
          </li>
        </ul>
        <hr></hr>
      </nav>
    </div>
  );
};
  

export default NavBar;
