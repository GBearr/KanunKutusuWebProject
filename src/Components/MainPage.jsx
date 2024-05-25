import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  Button,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProposalCard } from "./ProposalCard";
import { postService } from "../services/PostService";

export const MainPage = () => {
  const [proposals, setProposals] = useState([]);
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  console.log(proposals);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchProposals = async () => {
      let data;
      if (tabValue === 0) {
        data = await postService.getNewPosts(1, user?.id || null);
      } else {
        data = await postService.getPopularPosts(1, user?.id || null);
      }
      setProposals(data);
    };

    fetchProposals();
  }, [tabValue, user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ border: "none", borderColor: "divider", mt: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Yeni" />
          <Tab label="Popüler" />
        </Tabs>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid container direction="column" alignItems="center" spacing={4}>
              {proposals.map((item) => (
                <Grid item xs={12} key={item.id} sx={{ minWidth: "100%" }}>
                  <ProposalCard
                    id={item.id}
                    user_image={item.profileImageUrl}
                    image={item.imageUrl}
                    title={item.title}
                    description={item.content}
                    date={item.timesAgo}
                    support={item.supportCount}
                    state={item.state}
                    user_id={item.userId}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
