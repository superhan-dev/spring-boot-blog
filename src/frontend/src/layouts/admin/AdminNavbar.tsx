import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Hidden
} from "@mui/material";
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MenuIcon from "@mui/icons-material/Menu";
import InputIcon from "@mui/icons-material/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch } from "../../states/hooks";
import { logout } from "../../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router";

interface AdminNavbarProps {
  onMobileNavOpen:() => void;
}

export const AdminNavbar:React.FC<AdminNavbarProps> = ({onMobileNavOpen,...props}) => {
  const [notifications] = useState([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    let from = location.state?.from?.pathname || "/login";
    dispatch(logout());
    navigate(from, { replace: true });
  }

  return (
    <AppBar elevation={0} {...props}>
    <Toolbar>
      <Link to="/">{/* <Logo /> */}</Link>
      <Box sx={{ flexGrow: 1 }} />
      <Hidden xlDown>
        <IconButton color="inherit" size="large">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" size="large" onClick={handleLogout}>
          <InputIcon />
        </IconButton>
      </Hidden>
      <Hidden lgUp>
        <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
  )
}
