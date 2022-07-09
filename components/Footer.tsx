import * as React from "react";
import { Typography, Box } from "@mui/material";
import { NextPage } from "next";
import { useStyles } from "../styles/useStyles";

export const Footer: NextPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer} component="footer">
      <Typography variant="body2">Made by Yash Oza</Typography>
    </Box>
  );
};
