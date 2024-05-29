import React, { useState, useEffect } from "react";
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
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { authService } from "../services/AuthService";
import CryptoJS from "crypto-js";

const onSubmit = async (values, actions) => {
  console.log("Form values:", values);

  const hashedPassword = CryptoJS.SHA256(values.password).toString(
    CryptoJS.enc.Hex
  );

  try {
    const response = await authService.signUp({
      p_email_address: values.email,
      p_first_name: values.firstName,
      p_last_name: values.lastName,
      p_password: hashedPassword,
      p_username: values.username,
    });
  } catch (error) {
    console.error("Error creating user", error);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "Muhammed Murat",
      lastName: "Çetin",
      username: "mmuratcetinn",
      email: "muhammedmuratc2@gmail.com",
      password: "Passw0rd!",
      confirmPassword: "Passw0rd!",
    },
    validationSchema: signUpSchema,
    onSubmit,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Stil değişikliklerini uygula
    document.body.style.overflow = "hidden";

    return () => {
      // Stil değişikliklerini geri al
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflow = "";
    };
  }, []);

  const onNavigate = () => {
    window.location.href = "/login";
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
        direction="row"
        spacing={3}
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
        <Typography variant="h4" textAlign={"center"}>
          KANUN KUTUSU
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={3} width="100%">
            <Stack direction={"row"} spacing={3}>
              <TextField
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <PersonIcon />
                //     </InputAdornment>
                //   ),
                // }}
                label="İsim"
                fullWidth
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <PersonIcon />
                //     </InputAdornment>
                //   ),
                // }}
                label="Soyisim"
                fullWidth
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Stack>
            <TextField
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              label="Kullanıcı Adı"
              fullWidth
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              label="E-Mail"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
              label="Parola"
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              }}
              label="Parola(Tekrar)"
              fullWidth
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
              <Checkbox size="medium" />
              <Typography variant="body1">Sözleşmeyi kabul ediyorum</Typography>
            </Stack>
            <Button
              onClick={onNavigate}
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
            >
              Kayıt Ol
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
