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
import Post from "../Models/postModel";

export const ProposalCard = ({ post }) => {
  const navigate = useNavigate();

  console.log(post);

  const handleClick = () => {
    navigate(`/carddetail/${post.id}`, {
      state: {
        post: post,
      },
    });
  };
  console.log("post:", post);

  return (
    <Card
      sx={{ maxWidth: "100%", border: "none", borderRadius: "16px" }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      variant="outlined"
    >
      <CardHeader
        avatar={<Avatar src={post.profileImageUrl} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
        }
        subheader={post.date}
      />
      {post.imageUrl ? (
        <CardMedia component={"img"} height={"100%"} image={post.imageUrl} />
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
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button color="inherit">
          <ThumbUpAltOutlinedIcon sx={{ mr: 1 }} />
          {post.supportCount}
        </Button>
        <Button color="inherit">
          <ModeCommentOutlinedIcon sx={{ mr: 1 }} />
          {post.commentCount}
        </Button>
      </CardActions>
    </Card>
  );
};
