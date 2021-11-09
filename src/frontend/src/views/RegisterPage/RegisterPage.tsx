import React from "react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Header } from "../../components";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          height: "auto",
          display: "flex",
          position: "relative",
          alignItems: "center",
          backgroundImage:
            "url(" + require("../../assets/image/landing-bg.jpg").default + ")",
        }}
      >
        <Container>
          <RegisterForm />
        </Container>
      </Box>
    </>
  );
};
