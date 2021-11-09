import { Box } from "@mui/system";
import React from "react";

export const ContentContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.1)",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <Box sx={{ width: "100%", margin: "30px" }}>{children}</Box>
    </Box>
  );
};
