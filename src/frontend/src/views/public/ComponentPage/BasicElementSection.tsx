import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ButtonSection } from "./ButtonSection";
import { InputSection } from "./InputSection";

export const BasicElementSection: React.FC = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        Basic Elements
      </Typography>
      <ButtonSection />
      <InputSection />
    </Box>
  );
};
