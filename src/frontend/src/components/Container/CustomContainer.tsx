import { Container } from "@mui/material";
import React from "react";
import styles from "../../styles/blogStyle";

export const CustomContainer: React.FC = ({ children }) => {
  return <Container sx={{ ...styles.container }}>{children}</Container>;
};
