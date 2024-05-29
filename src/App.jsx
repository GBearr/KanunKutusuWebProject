import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Card,
  CardHeader,
  Divider,
  createTheme,
} from "@mui/material";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { MainPage } from "./Components/MainPage";
import { ProfileScreen } from "./Components/ProfileScreen";
import { ProposalDetail } from "./Components/ProposalDetail";
import { ProposalCreate } from "./Components/ProposalCreate";
import DrawerItems from "./Components/DrawerItems";
import SearchDrawer from "./Components/SearchDrawer";
import AppBar from "./Components/AppBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ProposalState } from "./Components/ProposalState";
import { postService } from "./services/PostService";
import { userService } from "./services/UserService";
import ErrorBoundary from "./Components/ErrorBoundary";
import AdminLogin from "./Components/AdminLogin";
import AdminPanel from "./Components/AdminPanel";
import logo from "../src/assets/logo.svg";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      mdlg: 1100,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideAppBarOnPaths = ["/login", "/signup", "/adminlogin", "/adminpanel"];
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isMdLG = useMediaQuery(theme.breakpoints.down("mdlg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const searchTimeoutRef = useRef(null);
  console.log(isMd);
  const drawerWidth = isMd ? 240 : 340;

  document.body.style.backgroundColor = "#f3f3f8";

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

  const handleRightDrawerToggle = () => {
    setRightDrawerOpen(!rightDrawerOpen);
  };

  const handleLogin = (userData) => {
    sessionStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  const handleSearchChange = useCallback(
    (event) => {
      const query = event.target.value.length > 2 ? event.target.value : null;
      setSearchQuery(query);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(async () => {
        if (query && query.trim() !== "") {
          const postResults = await postService.searchPosts(user.id, query);
          const userResults = await userService.searchUsers(query);
          const combinedResults = [
            ...postResults.map((item) => ({ ...item, type: "post" })),
            ...userResults.map((item) => ({ ...item, type: "user" })),
          ];
          setSearchResults(combinedResults);
        } else {
          setSearchResults([]);
        }
      }, 1000);
    },
    [user]
  );

  const handleProfileClick = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        {isMdLG && <AppBar handleDrawerToggle={handleDrawerToggle} />}

        {!hideAppBarOnPaths.includes(location.pathname) && (
          <Drawer
            variant={isMd ? "temporary" : "permanent"}
            open={isMd ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f3f3f8",
                backdropFilter: "blur(5px)",
                color: "black",
              },
            }}
          >
            <Toolbar />
            <img style={{ alignSelf: "center", width: "50%" }} src={logo} />
            <Divider sx={{ mt: 2 }} />
            <DrawerItems handleSearchDrawerToggle={handleSearchDrawerToggle} />
          </Drawer>
        )}

        {user && !hideAppBarOnPaths.includes(location.pathname) && (
          <Drawer
            anchor="right"
            variant={isMd ? "temporary" : "permanent"}
            open={rightDrawerOpen}
            onClose={handleRightDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f3f3f8",
                backdropFilter: "blur(5px)",
                color: "black",
                borderLeft: "1px solid #f3f3f8",
              },
            }}
          >
            <Toolbar />
            <Stack
              direction={"column"}
              sx={{
                marginRight: "10%",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Button
                fullWidth
                sx={{ mb: 5 }}
                onClick={() => navigate("/proposalcreate")}
              >
                <AddCircleIcon />
                <Typography variant="h6">Teklif Oluştur</Typography>
              </Button>
              <Card
                variant="outlined"
                onClick={handleProfileClick}
                sx={{
                  borderRadius: "16px",
                  cursor: "pointer",
                  textAlign: "center",
                  border: "none",
                }}
              >
                <Stack sx={{ alignItems: "center" }}>
                  <Avatar
                    sx={{
                      mt: 2,
                      borderRadius: "50%",
                      width: { xs: 100, sm: 150, md: 200 },
                      height: { xs: 100, sm: 150, md: 200 },
                    }}
                    src={user.profile_image_url}
                  />
                  <CardHeader
                    subheader={
                      <>
                        <Typography sx={{ mt: 2, color: "black" }} variant="h5">
                          {user.first_name + " " + user.last_name}
                        </Typography>
                        <Typography variant="subtitle1">
                          {user.profile_description}
                        </Typography>
                      </>
                    }
                  />
                </Stack>
              </Card>
            </Stack>
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
              !hideAppBarOnPaths.includes(location.pathname) && !isMd
                ? `${drawerWidth}px`
                : 0,
            mr:
              !hideAppBarOnPaths.includes(location.pathname) && !isMd
                ? `${drawerWidth}px`
                : 0,
          }}
        >
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/profile/:id" element={<ProfileScreen />} />
            <Route path="/carddetail/:id" element={<ProposalDetail />} />
            <Route path="/proposalcreate" element={<ProposalCreate />} />
            <Route path="/proposalstate/:id" element={<ProposalState />} />
            <Route
              path="/adminlogin"
              element={<AdminLogin handleLogin={handleLogin} />}
            />
            <Route path="/adminpanel" element={<AdminPanel />} />
          </Routes>
        </Box>
      </div>
    </ErrorBoundary>
  );
}

export default App;
