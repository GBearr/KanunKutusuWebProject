import React, { useState, useEffect, useCallback } from "react";
import {
  Route,
  Routes,
  useLocation,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
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
  TextField,
  InputAdornment,
  ListItem,
  Button,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

import "./App.css";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { MainPage } from "./Components/MainPage";
import { ProfileScreen } from "./Components/ProfileScreen";
import logo from "./assets/kanunkutusu.png";
import { ProposalDetail } from "./Components/ProposalDetail";

const drawerWidth = 240;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideAppBarOnPaths = ["/login", "/signup"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [user, setUser] = useState({ name: "Murat Çetin" });
  const [searchQuery, setSearchQuery] = useState("");
  const [proposals, setProposals] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // JSON Server'dan tüm verileri çek
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
    setUser(userData);
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (!query.trim()) {
        setSearchResults([]); // Boş sorgu olduğunda sonuçları temizle
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
              {drawerItems.map((item) => (
                <ListItem sx={{ marginTop: 1 }} key={item.name} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.path}
                    onClick={item.onClick}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6">{item.name} </Typography>
                      }
                    />
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
          value={searchQuery}
          onChange={handleSearchChange}
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
        <List>
          {searchResults.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
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
        {user && (
          <Stack
            direction={"row"}
            sx={{ justifyContent: "flex-end", alignItems: "center" }}
          >
            <Button disableRipple onClick={() => navigate("/profile")}>
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
              <Typography marginLeft={"15px"} color={"white"} variant="h5">
                {user.name}
              </Typography>
            </Button>
          </Stack>
        )}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/carddetail/:id" element={<ProposalDetail />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
