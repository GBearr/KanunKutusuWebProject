import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { createPostSchema } from "../schemas";
import { postService } from "../services/PostService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const ProposalCreate = () => {
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const onSubmit = async (values, actions) => {
    console.log("Form values:", values);

    try {
      await postService.createPost({
        p_user_id: user.id,
        p_title: values.title,
        p_content: values.content,
        p_image_url: values.imageUrl,
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    setImagePreview(null); // Reset image preview
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
    validationSchema: createPostSchema,
    onSubmit,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("imageUrl", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("image-upload-input").click();
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    formik.setFieldValue("imageUrl", "");
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
        direction="column"
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
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload-input"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload-input">
          <Button
            sx={{ maxWidth: "500", maxHeight: "500" }}
            color={imagePreview ? "inherit" : "primary"}
            variant="contained"
            onClick={handleUploadClick}
            fullWidth
          >
            {imagePreview ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: -13,
                    right: -13,
                    color: "red",
                  }}
                  onClick={handleRemoveImage}
                >
                  <CancelIcon fontSize="large" />
                </IconButton>
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                />
              </Box>
            ) : (
              <AddCircleIcon />
            )}
          </Button>
        </label>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={3} width="100%">
            <TextField
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              label="Başlık"
              fullWidth
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              multiline
              rows={5}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              label="İçeriği giriniz"
              fullWidth
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
            >
              Gönder
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
