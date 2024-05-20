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

  const handleClick = (id) => {
    navigate(`/carddetail/${id}`);
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
        {searchResults.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton onClick={() => handleClick(item.id)}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SearchDrawer;
