import React, { useEffect, useState } from "react";
import { fetchLawProposals } from "./api";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
  Box,
  Tabs,
  Tab,
  CardHeader,
  Avatar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import { ProposalCard } from "./ProposalCard";
import { ProposalDetail } from "./ProposalDetail";

export const MainPage = () => {
  const [proposals, setProposals] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const getProposals = async () => {
      const data = await fetchLawProposals();
      console.log("Fetched Proposals:", data); // Verileri konsola yazdır
      setProposals(data);
    };
    getProposals();
  }, []);

  return (
    <>
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
                  {/* <Card sx={{ maxWidth: "100%" }}>
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.user}
                      subheader="date"
                    />
                    <CardMedia
                      component={"img"}
                      height={194}
                      image={item.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card> */}
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
