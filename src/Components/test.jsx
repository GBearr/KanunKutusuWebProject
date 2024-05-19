import React, { useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  Link as RouterLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  Drawer,
  List,
  ListItemText,
  Toolbar,
  Box,
  Stack,
  ListItemButton,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  ListItemIcon,
  Collapse,
  TextField,
  InputAdornment,
  ListItem,
  Button,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import "./App.css";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { MainPage } from "./Components/MainPage";
import { ProfileScreen } from "./Components/ProfileScreen";

const drawerWidth = 240;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideAppBarOnPaths = ["/login", "/signup"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);

  const handleSearchDrawerToggle = () => {
    setSearchDrawerOpen(!searchDrawerOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

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
    <div className="App">
      {!hideAppBarOnPaths.includes(location.pathname) && (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: isMobile ? drawerWidth : "20vw",
                backgroundColor: "rgba(105, 124, 136, 0.1)",
                background:
                  "linear-gradient(to right, rgba(105, 124, 136, 0.1), rgba(138, 142, 144, 0.1))",
                backdropFilter: "blur(5px)",
                color: "white",
                borderRight: "1px solid #ccccc",
              },
            }}
          >
            <Toolbar />
            <Typography variant="h4" marginBottom={2} textAlign="center">
              KANUN KUTUSU
            </Typography>

            <List>
              {drawerItems.map((item, index) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.path}
                    onClick={item.onClick}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      )}

      <Drawer
        anchor="right"
        open={searchDrawerOpen}
        onClose={handleSearchDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            padding: 2,
          },
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Ara..."
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml:
            !hideAppBarOnPaths.includes(location.pathname) && !isMobile
              ? "20vw"
              : 0,
        }}
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <Button disableRipple onClick={() => handleNavigation("/profile")}>
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            <Typography marginLeft={"15px"} color={"white"} variant="h5">
              Murat Çetin
            </Typography>
          </Button>
        </Stack>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
