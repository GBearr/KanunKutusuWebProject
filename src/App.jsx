import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import {
  Drawer,
  Toolbar,
  Box,
  Stack,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [proposals, setProposals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(to right, #697c88, #8a8e90)";
    document.body.style.backgroundColor = "#517faf";

    return () => {
      document.body.style.background = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get("http://localhost:3000/proposals");
        setProposals(response.data);
      } catch (error) {
        console.error("Veriler çekilirken bir hata oluştu:", error);
      }
    };

    fetchProposals();
  }, []);

  const handleSearchDrawerToggle = () => {
    setSearchDrawerOpen(!searchDrawerOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      const filteredResults = proposals.filter((proposal) =>
        proposal.title.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
    }, 300),
    [proposals]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

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
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/carddetail/:id" element={<ProposalDetail />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
