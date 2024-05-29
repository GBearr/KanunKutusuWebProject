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
  Icon,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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

  const handleDeleteClick = () => {
    sessionStorage.removeItem("currentUser");
  };

  return (
    <List sx={{ height: "100%" }}>
      {drawerItems.map((item, index) => (
        <React.Fragment key={item.name}>
          <ListItem sx={{ marginTop: 1, height: "80px" }} disablePadding>
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
                  primary={
                    <Typography
                      sx={{
                        fontSize: "100%",
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                      }}
                      variant="h6"
                    >
                      {item.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Paper>
          </ListItem>
          {index === 1 && <Divider />}
          {index === 4 && <Divider />}{" "}
        </React.Fragment>
      ))}
      <Divider />
      <ListItem sx={{ margin: "auto", height: "80px" }} disablePadding>
        <Paper elevation={0} sx={{ backgroundColor: "#f3f3f8", width: "100%" }}>
          <ListItemButton
            onClick={handleDeleteClick}
            component={RouterLink}
            to="/login"
          >
            <ListItemIcon>
              <ExitToAppIcon color="error" fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  color={"error"}
                  sx={{
                    fontSize: "100%",
                  }}
                  variant="h6"
                >
                  Çıkış Yap
                </Typography>
              }
            />
          </ListItemButton>
        </Paper>
      </ListItem>
    </List>
  );
};

export default DrawerItems;
