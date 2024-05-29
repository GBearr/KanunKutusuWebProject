import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  Stack,
  Button,
  Card,
  CardHeader,
  Avatar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Height } from "@mui/icons-material";

const RightDrawer = ({
  isMdLG,
  rightDrawerOpen,
  handleRightDrawerToggle,
  drawerWidth,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleClick = () => {
    navigate(`/profile/${user?.id}`);
  };

  console.log(user);

  return (
    <Drawer
      anchor="right"
      variant={isMdLG ? "temporary" : "permanent"}
      open={rightDrawerOpen}
      onClose={handleRightDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: "#f3f3f8",
          backdropFilter: "blur(5px)",
          color: "black",
          borderLeft: "1px solid #f3f3f8",
        },
      }}
    >
      <Toolbar />
      <Stack
        direction={"column"}
        sx={{
          marginRight: "10%",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          disableElevation
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 5, borderRadius: "32px" }}
          onClick={() => navigate("/proposalcreate")}
        >
          <AddIcon />
          <Typography variant="h6">Teklif Oluştur</Typography>
        </Button>
        {user && (
          <Card
            variant="outlined"
            onClick={handleClick}
            sx={{
              borderRadius: "16px",
              cursor: "pointer",
              textAlign: "center",
              border: "none",
            }}
          >
            <Stack sx={{ alignItems: "center" }}>
              <Avatar
                sx={{
                  mt: 2,
                  borderRadius: "50%",
                  width: { xs: 100, sm: 150, md: 200 },
                  height: { xs: 100, sm: 150, md: 200 },
                }}
                src={user.profile_image_url}
              />

              <CardHeader
                subheader={
                  <>
                    <Typography sx={{ mt: 2, color: "black" }} variant="h5">
                      {user.first_name + " " + user.last_name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {user.profile_description}
                    </Typography>
                  </>
                }
              />
            </Stack>
          </Card>
        )}
      </Stack>
    </Drawer>
  );
};

export default RightDrawer;
