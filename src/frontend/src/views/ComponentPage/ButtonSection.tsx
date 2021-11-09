import React from "react";
import { Button, Fab, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const ButtonSection = () => {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Buttons
      </Typography>

      <Typography variant="body1" component="div">
        Pick your style
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          "& > *": {
            margin: "1px",
          },
          width: "100%",
          mb: 5,
        }}
      >
        <Button>DEFAULT</Button>
        <Button variant="contained">CONTAINED</Button>
        <Button variant="contained" sx={{ borderRadius: "20px" }}>
          ROUND
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "45px" }}
          startIcon={<FavoriteIcon />}
        >
          WITH ICON
        </Button>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <Fab color="primary" aria-label="favorite">
          <FavoriteIcon />
        </Fab>
      </Box>

      <Typography variant="body1" component="div">
        Pick your size
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          "& > *": {
            margin: "1px",
          },
          width: "100%",
          mb: 5,
        }}
      >
        <Button variant="contained" size="small">
          SMALL
        </Button>
        <Button variant="contained" size="medium">
          MEDIUM
        </Button>
        <Button variant="contained" size="large">
          LARGE
        </Button>
      </Box>

      <Typography variant="body1" component="div">
        Pick your color
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          "& > *": {
            margin: "1px",
          },
          width: "100%",
          mb: 5,
        }}
      >
        <Button variant="contained" color="inherit">
          inherit
        </Button>
        <Button variant="contained" color="primary">
          primary
        </Button>
        <Button variant="contained" color="info">
          info
        </Button>
        <Button variant="contained" color="success">
          success
        </Button>
        <Button variant="contained" color="warning">
          warning
        </Button>
        <Button variant="contained" color="error">
          error
        </Button>
      </Box>
    </>
  );
};
