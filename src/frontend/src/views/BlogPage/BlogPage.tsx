import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { BlogTemplate } from "../../layouts/blog/BlogTemplate";
import { BlogList } from "./BlogList";

export const BlogPage = () => {
  return (
    <BlogTemplate
      image={require("../../assets/image/bg4.jpg").default}
      slogan={
        <Box sx={{ color: "#FFFFFF", textAlign: "left" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontSize: "4rem", fontWeight: "600" }}
          >
            Material Kit React.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              fontSize: "1.313rem",
              maxWidth: "500px",
              margin: "10px 0 0",
            }}
          >
            A Badass Material-UI Kit based on Material Design.
          </Typography>
        </Box>
      }
    >
      <BlogList />
    </BlogTemplate>
  );
};
