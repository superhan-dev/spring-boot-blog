import React from 'react'
import {
  Avatar,
  Box,
  // Button,
  Divider,
  List,
  Typography,
} from "@mui/material";

import { Link } from 'react-router-dom';
import { NavigationItem, NavigationItemProps } from './NavigationItem';
import { User } from '../../features/auth/authApi';

interface NavigationListProps {
  user:User;
  items: NavigationItemProps[];
}

export const NavigationList:React.FC<NavigationListProps> = ({user,items}) => {

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Avatar
        component={Link}
        src={user?.avatar}
        sx={{
          cursor: "pointer",
          width: 64,
          height: 64,
        }}
        to="/app/account"
      />
      <Typography color="textPrimary" variant="h5">
        {user?.username}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {user?.role}
      </Typography>
    </Box>
    <Divider />
    <Box sx={{ p: 2 }}>
      <List>
        {items.map((item) => (
          <NavigationItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </List>
    </Box>
    <Box sx={{ flexGrow: 1 }} />
  </Box>
  )
}
