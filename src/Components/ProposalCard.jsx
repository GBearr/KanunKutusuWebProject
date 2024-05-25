// KanunCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  IconButton,
  CardHeader,
  Avatar,
  Badge,
  styled,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import { Settings } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const ProposalCard = ({
  id,
  user_image,
  date,
  image,
  title,
  description,
  support,
  state,
  user_id,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/carddetail/${id}`, {
      state: {
        id,
        user_image,
        date,
        image,
        title,
        description,
        support,
        state,
        user_id,
      },
    });
  };

  return (
    <Card
      sx={{ maxWidth: "100%", border: "none", borderRadius: "16px" }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      variant="outlined"
    >
      <CardHeader
        avatar={<Avatar src={user_image} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        }
        subheader={date}
      />
      {image ? (
        <CardMedia component={"img"} height={194} image={image} />
      ) : null}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <StyledBadge badgeContent={support} color="secondary">
            <ThumbUpIcon />
          </StyledBadge>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
