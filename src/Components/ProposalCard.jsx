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
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

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
  comment,
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
        comment,
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
        <CardMedia component={"img"} height={"100%"} image={image} />
      ) : null}
      <CardContent>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button color="inherit">
          <ThumbUpAltOutlinedIcon sx={{ mr: 1 }} />
          {support}
        </Button>
        <Button color="inherit">
          <ModeCommentOutlinedIcon sx={{ mr: 1 }} />
          {comment}
        </Button>
      </CardActions>
    </Card>
  );
};
