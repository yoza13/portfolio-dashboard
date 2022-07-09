import {
  AppBar,
  Avatar,
  Box,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useRouter } from "next/router";
import AppContext from "../AppContext";
import { ScrollTop } from "../components/ScrollTop";

const Yash = require("../images/Yash.jpg").default;

export const NavigationBar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
  const router = useRouter();
  const leftNavItems = [
    {
      title: "Home",
      page: "/home",
    },
    {
      title: "About Me",
      page: "/about-me",
    },
    {
      title: "Experience",
      page: "/experience",
    },
    {
      title: "Projects",
      href: "https://www.projects.yashvoza.com/",
    },
    {
      title: "Contact Me",
      page: "/contact-me",
    },
  ];
  const drawer = () => {
    return (
      <Box onClick={() => setOpenDrawer(false)}>
        <List>
          {leftNavItems.map((item, index) => (
            <>
              {item.page ? (
                <ListItem key={item.title + index}>
                  <ListItemButton
                    component="button"
                    key={item.title + index}
                    onClick={() => {
                      router.push(item.page);
                    }}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem
                  secondaryAction={
                    <IconButton aria-label="new-tag-icon">
                      <OpenInNewIcon />
                    </IconButton>
                  }
                  key={item.title + index}
                  onClick={() =>
                    window.open("https://www.projects.yashvoza.com/", "_blank")
                  }
                >
                  <ListItemText primary={item.title} sx={{ pl: "16px" }} />
                </ListItem>
              )}
            </>
          ))}
        </List>
      </Box>
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }} component="nav">
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          &nbsp;&nbsp;&nbsp;
          <IconButton onClick={() => router.push("/home")}>
            <Avatar alt="Yash Oza" src={Yash.src} />
          </IconButton>
          &nbsp; &nbsp; &nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yash Oza
          </Typography>
          <>
            <Switch
              onChange={() => setIsDarkTheme?.(!isDarkTheme)}
              checked={isDarkTheme}
            />
            <NightlightOutlinedIcon />
          </>
          <SwipeableDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            PaperProps={{
              sx: {
                width: "300px",
              },
            }}
          >
            {drawer()}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
};
