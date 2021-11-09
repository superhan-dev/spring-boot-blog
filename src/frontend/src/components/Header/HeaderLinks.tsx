import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useAppSelector } from "../../states/hooks";
import { getMenus, Menu } from "./headerSlice";

export const HeaderLinks: React.FC = () => {
  const menus: Menu[] = useAppSelector(getMenus);

  return (
    <Box sx={{ width: 250 }}>
      <List>
        {menus.map((menu, index) => (
          <ListItem button key={menu.name}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.name} sx={{ color: "" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
