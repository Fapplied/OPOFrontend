// import * as React from 'react';
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { removeLS, setLS } from "../helpers/storage";
import jwtDecode from "jwt-decode";
import endpoints from "../helpers/endpoints";
import "../styles/NavigationMenu.css";
import { IconButton} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavigationMenu = ({ setUser, user }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = useNavigate();

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

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenuVisible({ ...menuVisible, [anchor]: open });
  };

  const navigateHome = () => {
    navigate('/');
  };
  const navigateToProfile = () => {
    navigate('/profile');
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={navigateHome}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        {user !== false && <ListItem disablePadding>
          <ListItemButton onClick={navigateToProfile}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>}
        {user !== false && <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItemButton>
        </ListItem>}
      </List>
    </Box>
  );

  return (
    <div>
      <div >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar  >
            <Toolbar className="app-bar">
              <IconButton
                onClick={toggleDrawer('left', true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                OPO
              </Typography>
              {/*<div id="signInDiv"></div>*/}
              {user === false ? <div id="signInDiv"></div> : <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>}
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer
          anchor='left'
          open={menuVisible['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>

      </div>
    </div>
  );
}

export default NavigationMenu;