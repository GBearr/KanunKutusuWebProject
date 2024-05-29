import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProfileCard = ({ user }) => {
  return (
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
  );
};

export default ProfileCard;
