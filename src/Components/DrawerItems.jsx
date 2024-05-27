import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
  styled,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link as RouterLink } from "react-router-dom";

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   height: 80,
//   lineHeight: "60px",
// }));

const DrawerItems = ({ handleSearchDrawerToggle }) => {
  const drawerItems = [
    { name: "Ana Sayfa", path: "/", icon: <HomeIcon fontSize="large" /> },
    {
      name: "Ara",
      icon: <SearchIcon fontSize="large" />,
      onClick: handleSearchDrawerToggle,
    },
    // { name: "Giriş Yap", path: "/login", icon: <MailIcon /> },
    // { name: "Kayıt Ol", path: "/signup", icon: <MailIcon /> },
    {
      name: "Bekleyen Öneriler",
      path: `/proposalstate/${1}`,
      icon: <HourglassEmptyIcon fontSize="large" />,
    },
    {
      name: "Onaylanan Öneriler",
      path: `/proposalstate/${2}`,

      icon: <CheckCircleIcon fontSize="large" />,
    },
    {
      name: "Reddedilen Öneriler",
      path: `/proposalstate/${3}`,

      icon: <CancelIcon fontSize="large" />,
    },
  ];

  return (
    <List>
      {drawerItems.map((item) => (
        <ListItem
          sx={{ marginTop: 1, height: "80px" }}
          key={item.name}
          disablePadding
        >
          <Paper
            elevation={0}
            sx={{ backgroundColor: "#f3f3f8", width: "100%" }}
          >
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
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default DrawerItems;
