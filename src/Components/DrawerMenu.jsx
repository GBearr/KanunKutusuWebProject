import React from "react";
import { Drawer, Toolbar, Divider } from "@mui/material";
import DrawerItems from "./DrawerItems";
import logo from "../assets/logo.svg";

const DrawerMenu = ({
  isMdLG,
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
  handleSearchDrawerToggle,
}) => {
  return (
    <Drawer
      variant={isMdLG ? "temporary" : "permanent"}
      open={isMdLG ? mobileOpen : true}
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
  );
};

export default DrawerMenu;
