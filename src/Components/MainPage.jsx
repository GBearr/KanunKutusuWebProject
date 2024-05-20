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

export const MainPage = () => {
  const [proposals, setProposals] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Session storage'dan kullanıcı bilgisini çekme
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Teklifleri fetch etme
    const fetchProposals = async () => {
      const response = await fetch("http://localhost:3000/proposals");
      const data = await response.json();
      setProposals(data);
    };
    fetchProposals();
  }, []);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      {user && (
        <Stack
          direction={"row"}
          sx={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <Button disableRipple onClick={() => navigate("/profile")}>
            <Avatar alt="User Avatar" />
            <Typography marginLeft={"15px"} color={"white"} variant="h6">
              {user.firstName + " " + user.lastName}
            </Typography>
          </Button>
        </Stack>
      )}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Senin için" />
          <Tab label="Takip ettiklerin" />
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
                    user={item.user}
                    image={item.image}
                    title={item.title}
                    description={item.description}
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
