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
import { postService } from "./services/PostService"; // Yeni import
import { userService } from "./services/UserService"; // Yeni import
import ErrorBoundary from "./Components/ErrorBoundary";

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
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const searchTimeoutRef = useRef(null); // Ref to store the timeout ID

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
        if (query.trim() !== "") {
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

        {user && (
          <Drawer
            anchor="right"
            variant={isMobile ? "temporary" : "permanent"}
            open={rightDrawerOpen}
            onClose={handleRightDrawerToggle}
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
                borderLeft: "1px solid #f3f3f8",
              },
            }}
          >
            <Toolbar />
            <Stack
              direction={"column"}
              sx={{ justifyContent: "flex-end", alignItems: "center", mb: 2 }}
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
                  cursor: "pointer",
                  textAlign: "center",
                  border: "none",
                }}
              >
                <Stack sx={{ alignItems: "center" }}>
                  <Avatar
                    sx={{
                      mt: 2,
                      width: { xs: 100, sm: 150, md: 200 },
                      height: { xs: 100, sm: 150, md: 200 },
                    }}
                    src={user.profile_image_url}
                  />
                  <CardHeader
                    subheader={
                      <Typography sx={{ mt: 2 }} variant="h5" marginBottom={1}>
                        {user.first_name + " " + user.last_name}
                      </Typography>
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
              !hideAppBarOnPaths.includes(location.pathname) && !isMobile
                ? "20vw"
                : 0,
            mr:
              !hideAppBarOnPaths.includes(location.pathname) && !isMobile
                ? "20vw"
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
          </Routes>
        </Box>
      </div>
    </ErrorBoundary>
  );
}

export default App;
