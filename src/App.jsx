import React, { useState, useEffect, useRef, useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { MainPage } from "./Components/MainPage";
import { ProfileScreen } from "./Components/ProfileScreen";
import { ProposalDetail } from "./Components/ProposalDetail";
import { ProposalCreate } from "./Components/ProposalCreate";
import ProposalState from "./Components/ProposalState";
import ErrorBoundary from "./Components/ErrorBoundary";
import AdminLogin from "./Components/AdminLogin";
import AdminPanel from "./Components/AdminPanel";
import DrawerMenu from "./Components/DrawerMenu";
import RightDrawer from "./Components/RightDrawer";
import SearchDrawer from "./Components/SearchDrawer";
import AppBarComponent from "./Components/AppBarComponent";
import { postService } from "./services/PostService";
import { userService } from "./services/UserService";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      mdlg: 1000,
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

  const drawerWidth = isMdLG ? "20%" : "20%";
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

  return (
    <ErrorBoundary>
      <div className="App">
        {isMdLG && <AppBarComponent handleDrawerToggle={handleDrawerToggle} />}

        {!hideAppBarOnPaths.includes(location.pathname) ? (
          <>
            <DrawerMenu
              isMdLG={isMdLG}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              drawerWidth={drawerWidth}
              handleSearchDrawerToggle={handleSearchDrawerToggle}
            />
            <RightDrawer
              // user={user}
              isMdLG={isMdLG}
              rightDrawerOpen={rightDrawerOpen}
              handleRightDrawerToggle={handleRightDrawerToggle}
              drawerWidth={drawerWidth}
            />
          </>
        ) : null}

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
            p: 8,
            ml:
              !hideAppBarOnPaths.includes(location.pathname) && !isMdLG
                ? drawerWidth
                : 0,
            mr:
              !hideAppBarOnPaths.includes(location.pathname) && !isMdLG
                ? drawerWidth
                : 0,
            transition: "margin 0.3s ease-in-out",
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
