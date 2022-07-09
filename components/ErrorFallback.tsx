import * as React from "react";
import {
  Alert,
  AppBar,
  Avatar,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const Yash = require("../images/Yash.jpg").default;

export const ErrorFallback: React.FC = () => {
  return (
    <Container>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="Yash Oza" src={Yash} />
          &nbsp; &nbsp; &nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yash Oza
          </Typography>
        </Toolbar>
      </AppBar>
      <Alert severity="error" sx={{ mt: 15 }}>
        <Typography variant="h5">Something went wrong !!!!!!!</Typography>
        <Link underline="none" href="/">
          Go to Home Page
        </Link>
      </Alert>
    </Container>
  );
};
