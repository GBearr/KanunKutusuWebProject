import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const ProfileTabs = ({ tabValue, handleTabChange }) => {
  return (
    <Box sx={{ border: "none", borderColor: "divider" }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Paylaşılan Öneriler" />
        <Tab label="Bekleyen Öneriler" />
        <Tab label="Onaylanan Öneriler" />
        <Tab label="Reddedilen Öneriler" />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
