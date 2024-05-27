import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserManagement from "./UserManagement";
import Settings from "./Settings";
import { postService } from "../services/PostService";

const AdminPanel = () => {
  const [pendingProposals, setPendingProposals] = useState([]);
  const [approvedProposals, setApprovedProposals] = useState([]);
  const [rejectedProposals, setRejectedProposals] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const pendingData = await postService.getPendingPosts(page, 1);
        const approvedData = await postService.getApprovedPosts(page, 1);
        const rejectedData = await postService.getRejectedPosts(page, 1);
        setPendingProposals(pendingData);
        setApprovedProposals(approvedData);
        setRejectedProposals(rejectedData);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };
    fetchProposals();
  }, [page]);
  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Toolbar />
        <div style={{ overflow: "auto" }}>
          <List>
            <ListItem button component={Link} to="users">
              <ListItemText primary="Kullanıcı Yönetimi" />
            </ListItem>
            <ListItem button component={Link} to="settings">
              <ListItemText primary="Ayarlar" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: "16px" }}>
        <Toolbar />
        <Routes>
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;
