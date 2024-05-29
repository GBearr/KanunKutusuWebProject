import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, CircularProgress } from "@mui/material";
import { userService } from "../services/UserService";
import { postService } from "../services/PostService";
import ProfileCard from "./ProfileCard";
import ProfileTabs from "./ProfileTabs";
import PostsContainer from "./PostContainer";

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
      <ProfileCard user={user} />
      <ProfileTabs tabValue={tabValue} handleTabChange={handleTabChange} />
      <PostsContainer postOfUser={postOfUser} />
    </Stack>
  );
};
