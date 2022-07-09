import * as React from "react";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { useStyles } from "../styles/useStyles";
import AppContext from "../AppContext";
import Typewritter from "typewriter-effect";
const Yash = require("../images/Yash.jpg").default;

export const Home: React.FC = () => {
  const { isDarkTheme } = React.useContext(AppContext);
  const classes = useStyles({ isDarkTheme });
  return (
    <Container
      sx={{ margin: "auto", textAlign: "center" }}
      className={classes.appContainer}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Avatar
          alt="Yash Oza"
          src={Yash.src}
          className={classes.homePageAvatar}
        />
      </Box>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Hi, I am
        </Typography>
        <Typography variant="h5" gutterBottom component="div">
          Yash Oza
        </Typography>
      </Stack>
      <Typography variant="h3" gutterBottom component="div">
        What I do ?
      </Typography>
      <Typewritter
        options={{
          strings: [
            "I am a Full Stack Developer",
            "I love learning new technologies",
            "I love web design",
          ],
          autoStart: true,
          loop: true,
          cursor: "<",
        }}
      />
    </Container>
  );
};
