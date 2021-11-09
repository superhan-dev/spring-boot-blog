import React from "react";
import { Grid } from "@mui/material";

export const GridContainer: React.FC = ({ children }) => {
  return <Grid container>{children}</Grid>;
};
