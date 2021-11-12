import React from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Header } from "../../../components";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
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
            "url(" + require("../../../assets/image/landing-bg.jpg").default + ")",
        }}
      >
        <Container>
          <LoginForm />
        </Container>
      </Box>
    </>
  );
};
