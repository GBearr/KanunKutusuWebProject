import React from "react";
import { Grid, Container } from "@mui/material";
import { ProposalCard } from "./ProposalCard";

const PostsContainer = ({ postOfUser }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="column" alignItems="center" spacing={4}>
            {postOfUser.map((item) => (
              <Grid item xs={4} key={item.id} sx={{ minWidth: "100%" }}>
                <ProposalCard post={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostsContainer;
