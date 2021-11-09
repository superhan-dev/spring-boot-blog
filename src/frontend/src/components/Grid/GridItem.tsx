import React from "react";
import { Grid } from "@mui/material";

export const GridItem: React.FC = ({ children }) => {
  return (
    <Grid
      item
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "1px",
        paddingRight: "15px",
        paddingLeft: "15px",
        flexBasis: "auto",
      }}
    >
      {children}
    </Grid>
  );
};
