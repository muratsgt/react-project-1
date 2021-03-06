import React, { useContext, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Menu,
  Button,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from "@material-ui/icons/AccountCircle";
import { FirebaseAuthContext } from "../context/AuthContext";
import firebase from "../firebase/firebase.utils";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const { currentUser } = useContext(FirebaseAuthContext);
  const history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = useCallback(() => {
    firebase.signOut();
    setAnchorEl(null);
  }, []);

  const handleLogin = () => {
    history.push("/login");
    setAnchorEl(null);
  };

  const pressHome = () => {
    history.push("/")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={pressHome}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React Share
          </Typography>
          {currentUser ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {currentUser?.displayName}
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button onClick={handleLogin} color="inherit">
              Log in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
