import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // Doğrulama şemasını form içinde tanımlayalım
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

// Doğrulama şemasını tanımlayalım
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir email girin")
    .required("Email gerekli"),
  password: Yup.string().required("Parola gerekli"),
});

const onSubmit = async (values, actions, navigate) => {
  console.log("Form values submitted:", values); // Debugging

  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users = await response.json();
    console.log("Fetched users:", users); // Debugging

    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      console.log("Login successful");
      // alert("Login successful");
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/"); // Yönlendirme işlemi
    } else {
      console.error("Invalid email or password");
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Failed to fetch:", error);
    alert("Failed to connect to the server. Please try again later.");
  }

  actions.setSubmitting(false);
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => onSubmit(values, actions, navigate),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        <Typography variant="h3" textAlign={"center"}>
          KANUN KUTUSU
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={3} width="100%">
            <TextField
              sx={{ width: "100%" }}
              id="email"
              name="email"
              label="Email veya Kullanıcı Adı"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ width: "100%" }}
              id="password"
              name="password"
              label="Parola"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
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
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              type="submit"
              disabled={formik.isSubmitting}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
