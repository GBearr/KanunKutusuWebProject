import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  useTheme,
  useMediaQuery,
  Box,
  Stack,
  Typography,
  Button,
  Avatar,
  Drawer,
  Toolbar,
} from "@mui/material";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { MainPage } from "./Components/MainPage";
import { ProfileScreen } from "./Components/ProfileScreen";
import { ProposalDetail } from "./Components/ProposalDetail";
import DrawerItems from "./Components/DrawerItems";
import SearchDrawer from "./Components/SearchDrawer";
import AppBar from "./Components/AppBar";

const drawerWidth = 240;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideAppBarOnPaths = ["/login", "/signup"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#f3f3f8";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.background = "";
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearchDrawerToggle = () => {
    setSearchDrawerOpen(!searchDrawerOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
    sessionStorage.setItem("currentUser", JSON.stringify(userData)); // Kullanıcı bilgilerini sessionStorage'a kaydet
    setUser(userData); // State'i güncelle
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <div className="App">
      {!hideAppBarOnPaths.includes(location.pathname) && (
        <AppBar handleDrawerToggle={handleDrawerToggle} />
      )}

      {!hideAppBarOnPaths.includes(location.pathname) && (
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isMobile ? drawerWidth : "20vw",
              backgroundColor: "#f3f3f8",
              backdropFilter: "blur(5px)",
              color: "black",
              borderRight: "1px solid #f3f3f8",
            },
          }}
        >
          <Toolbar />
          <Typography variant="h4" marginBottom={2} textAlign="center">
            KANUN KUTUSU
          </Typography>

          <DrawerItems handleSearchDrawerToggle={handleSearchDrawerToggle} />
        </Drawer>
      )}

      <SearchDrawer
        open={searchDrawerOpen}
        onClose={handleSearchDrawerToggle}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        searchResults={searchResults}
      />

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
        {user && (
          <Stack
            direction={"row"}
            sx={{ justifyContent: "flex-end", alignItems: "center", mb: 2 }}
          >
            <Button disableRipple onClick={handleProfileClick}>
              <Avatar src={user.profile_image_url} alt="User Avatar" />
              <Typography marginLeft={"15px"} color={"black"} variant="h5">
                {user.first_name + " " + user.last_name}
              </Typography>
            </Button>
          </Stack>
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/profile/:id" element={<ProfileScreen />} />
          <Route path="/carddetail/:id" element={<ProposalDetail />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
