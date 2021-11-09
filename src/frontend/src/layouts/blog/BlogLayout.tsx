import { styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const BlogLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const BlogLayoutWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
}));

const BlogLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const BlogLayoutContent = styled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

export const BlogLayout: React.FC = () => {
  return (
    <BlogLayoutRoot>
      <BlogLayoutWrapper>
        <BlogLayoutContainer>
          <BlogLayoutContent>
            <Outlet />
          </BlogLayoutContent>
        </BlogLayoutContainer>
      </BlogLayoutWrapper>
    </BlogLayoutRoot>
  );
};
