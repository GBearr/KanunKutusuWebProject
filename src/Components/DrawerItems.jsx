import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const DrawerItems = ({ handleSearchDrawerToggle }) => {
  const drawerItems = [
    { name: "Ana Sayfa", path: "/", icon: <HomeIcon /> },
    {
      name: "Ara",
      path: "/",
      icon: <SearchIcon />,
      onClick: handleSearchDrawerToggle,
    },
    { name: "Giriş Yap", path: "/login", icon: <MailIcon /> },
    { name: "Kayıt Ol", path: "/signup", icon: <MailIcon /> },
    { name: "Profil", path: "/profile", icon: null },
  ];

  return (
    <List>
      {drawerItems.map((item) => (
        <ListItem sx={{ marginTop: 1 }} key={item.name} disablePadding>
          <ListItemButton
            component={RouterLink}
            to={item.path}
            onClick={item.onClick}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">{item.name}</Typography>}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerItems;
