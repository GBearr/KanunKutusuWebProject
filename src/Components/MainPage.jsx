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

export const MainPage = () => {
  const [proposals, setProposals] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

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
        if (tabValue === 0) {
          data = await postService.getNewPosts(page, user.id);
        } else {
          data = await postService.getPopularPosts(page, user.id);
        }

        // Verinin doğru yapıda olduğundan emin olun
        if (data && Array.isArray(data)) {
          setProposals((prevProposals) => [...prevProposals, ...data]);
          setHasMore(data.length > 0);
        } else {
          throw new Error("Beklenmeyen veri yapısı");
        }
      } catch (error) {
        console.error("Veri getirme hatası:", error);
        setHasMore(false); // Hata durumunda daha fazla veri olmadığını varsayın
      }
      setLoading(false);
    };

    if (user) {
      fetchProposals();
    }
  }, [tabValue, page, user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Sekme değiştirildiğinde sayfayı sıfırla
    setProposals([]); // Sekme değiştirildiğinde mevcut veriyi temizle
  };

  const lastProposalElementRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (lastProposalElementRef.current) {
      observer.current.observe(lastProposalElementRef.current);
    }
  }, [loading, hasMore]);
  console.log(proposals);

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
              {proposals.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  key={item.id}
                  sx={{ minWidth: "100%" }}
                  ref={
                    proposals.length === index + 1
                      ? lastProposalElementRef
                      : null
                  }
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

export default MainPage;
