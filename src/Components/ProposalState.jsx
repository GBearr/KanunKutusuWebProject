import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { ProposalCard } from "./ProposalCard";
import { postService } from "../services/PostService";
import { useParams } from "react-router-dom";

export const ProposalState = () => {
  const [proposals, setProposals] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { id } = useParams();
  console.log("ID:", id);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        let data;
        if (id == 1) {
          setProposals([]);
          data = await postService.getPendingPosts(page, user.id);
          console.log("Murata Girdi");
        } else if (id == 2) {
          setProposals([]);
          data = await postService.getApprovedPosts(page, user.id);
          console.log("Emreye Girdi");
        } else {
          setProposals([]);
          data = await postService.getRejectedPosts(page, user.id);
          console.log("Turaba Girdi");
        }

        // if (data && Array.isArray(data)) {
        //   setProposals((prevProposals) => [...prevProposals, ...data]);
        //   setHasMore(data.length > 0);
        // } else {
        //   throw new Error("Beklenmeyen veri yapısı");
        // }
        setProposals(data);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
        setHasMore(false);
      }
      setLoading(false);
    };

    if (user) {
      fetchProposals();
    }
  }, [tabValue, page, user, id]);

  console.log("Proposals:", proposals);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
    setProposals([]);
  };

  // const lastProposalElementRef = useRef();

  // useEffect(() => {
  //   if (loading) return;
  //   if (observer.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   });
  //   if (lastProposalElementRef.current) {
  //     observer.current.observe(lastProposalElementRef.current);
  //   }
  // }, [loading, hasMore]);

  return (
    <>
      {/* <Box sx={{ border: "none", borderColor: "divider", mt: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Yeni" />
          <Tab label="Popüler" />
        </Tabs>
      </Box> */}
      <Container sx={{ mt: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid container direction="column" alignItems="center" spacing={4}>
              {proposals.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  key={item.id}
                  sx={{ minWidth: "100%" }}
                  // ref={
                  //   proposals.length === index + 1
                  //     ? lastProposalElementRef
                  //     : null
                  // }
                >
                  <ProposalCard post={item} />
                </Grid>
              ))}
            </Grid>
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProposalState;
