import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const InputSection = () => {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Inputs
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          "& > *": {
            margin: "1rem",
          },
          width: "100%",
          mb: 5,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="outlined-search"
              label="Search field"
              type="search"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              error
              id="outlined-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              id="filled-required"
              label="Required"
              defaultValue="Hello World"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              disabled
              id="filled-disabled"
              label="Disabled"
              defaultValue="Hello World"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="filled-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="filled-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="filled-search"
              label="Search field"
              type="search"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="filled-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              variant="filled"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              error
              id="filled-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              required
              id="standard-required"
              label="Required"
              defaultValue="Hello World"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              disabled
              id="standard-disabled"
              label="Disabled"
              defaultValue="Hello World"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="standard-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="standard-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="standard-search"
              label="Search field"
              type="search"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              id="standard-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              error
              id="standard-error-helper-text"
              label="Error"
              defaultValue="Hello World"
              helperText="Incorrect entry."
              variant="standard"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
