import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchDrawer = ({
  open,
  onClose,
  searchQuery,
  handleSearchChange,
  searchResults,
}) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.type === "post") {
      navigate(`/carddetail/${item.id}`, {
        state: { post: item },
      });
    } else if (item.type === "user") {
      navigate(`/profile/${item.id}`);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          padding: 2,
        },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Ara..."
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <List>
        {searchResults.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => handleClick(item)}>
              {item.profileImageUrl ? (
                <Avatar sx={{ mr: 1 }} src={item.profileImageUrl} />
              ) : null}
              <ListItemText
                primary={item.title || `${item.firstName} ${item.lastName}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SearchDrawer;
