import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tabs,
  Tab,
  Stack,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";
import { userService } from "../services/UserService";
import { postService } from "../services/PostService";
import { ProposalCard } from "./ProposalCard";

export const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [postOfUser, setPostOfUser] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUser = await userService.getUsers(id);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Kullanıcı çekme hatası:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        let fetchedPosts;
        switch (tabValue) {
          case 0:
            fetchedPosts = await postService.getPostsOfUser(1, id, 28);
            break;
          case 1:
            fetchedPosts = await postService.getPendingPostsOfUser(1, id, 28);
            break;
          case 2:
            fetchedPosts = await postService.getApprovedPostsOfUser(1, id, 28);
            break;
          case 3:
            fetchedPosts = await postService.getRejectedPostsOfUser(1, id, 28);
            break;
          default:
            fetchedPosts = [];
        }
        setPostOfUser(fetchedPosts);
      } catch (error) {
        console.error("Post çekme hatası:", error);
      }
    };

    fetchUsers();
    fetchPosts();
  }, [id, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <Stack spacing={4}>
      <Card
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          backgroundColor: "#f3f3f8",
        }}
      >
        {user.profileImageUrl ? (
          <CardMedia
            component="img"
            sx={{
              ml: "9%",

              backgroundPosition: "center",
              width: 120,
              height: 120,
              borderRadius: "50%",
              mr: 2,
            }}
            image={user.profileImageUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
        ) : null}
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
          <CardContent>
            <Typography component="div" variant="h5">
              {user.firstName + " " + user.lastName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {user.profileDescription}
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Box sx={{ border: "none", borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Paylaşılan Öneriler" />
          <Tab label="Bekleyen Öneriler" />
          <Tab label="Onaylanan Öneriler" />
          <Tab label="Reddedilen Öneriler" />
        </Tabs>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <Grid container direction="column" alignItems="center" spacing={4}>
              {postOfUser.map((item) => (
                <Grid item xs={12} key={item.id} sx={{ minWidth: "100%" }}>
                  <ProposalCard post={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
