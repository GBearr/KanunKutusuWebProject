import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";

export const ProposalDetail = () => {
  const { state } = useLocation();
  const card = state;
  const navigate = useNavigate();
  console.log(card);

  const handleUserProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    if (!card) {
      navigate("/"); // Veya istediğiniz başka bir rota
    }
  }, [card, navigate]);

  if (!card) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Card sx={{ maxWidth: "100%", mt: 4 }}>
        <CardHeader
          sx={{ cursor: "pointer" }}
          onClick={() => handleUserProfileClick(card.user_id)}
          avatar={<Avatar src={card.user_image} />}
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={
            <Typography gutterBottom variant="h5" component="div">
              {card.title}
            </Typography>
          }
          subheader={card.date}
        />
        {card.image && (
          <CardMedia component={"img"} height={194} image={card.image} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProposalDetail;
