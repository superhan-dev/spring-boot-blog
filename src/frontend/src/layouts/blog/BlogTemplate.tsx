import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  ContentContainer,
  CustomContainer,
  GridContainer,
  GridItem,
  Parallax,
} from "../../components";
import { BlogNavbar } from "./BlogNavbar";

interface BlogTemplateProps {
  image?: string;
  slogan?: React.ReactNode;
}

export const BlogTemplate: React.FC<BlogTemplateProps> = ({
  children,
  image,
  slogan,
}) => {
  return (
    <Box>
      <BlogNavbar />
      <Parallax image={image}>
        <CustomContainer>
          <GridContainer>
            <GridItem>{slogan}</GridItem>
          </GridContainer>
        </CustomContainer>
      </Parallax>

      <ContentContainer>
        <Card
          sx={{
            width: "100%",
            height: "100%",
            transform: "translate(0,-70px)",
            paddingTop: "3rem",
          }}
        >
          <CustomContainer>{children}</CustomContainer>
        </Card>
      </ContentContainer>
    </Box>
  );
};
