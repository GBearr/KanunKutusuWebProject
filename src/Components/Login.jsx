import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logo from "../assets/kanunkutusu_transparent.png";

const onSubmit = async (values, actions) => {
  console.log("Form values:", values);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit,
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          maxWidth: "100%",
          width: "100%",
          backgroundColor: "white",
          p: 3,
          borderRadius: 2,
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <Box>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={3} width="100%">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Email veya Kullanıcı Adı"
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Parola"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" sx={{ width: "100%" }}>
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
