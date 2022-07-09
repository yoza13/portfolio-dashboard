import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import expData from "../content/experience.json";
import { useStyles } from "../styles/useStyles";
import AppContext from "../AppContext";

const Apple = require("../images/apple.png").default;
const adp = require("../images/adp.png").default;
const Amex = require("../images/american-express.png").default;
const Travelers = require("../images/travelers.png").default;

export const Experience: React.FC = () => {
  const [openResp, setOpenResp] = React.useState<string[]>([]);
  const handleClick = (id: string) => {
    const updatedRespArray = openResp.includes(id)
      ? openResp.filter((o) => o !== id)
      : openResp.concat(id);

    setOpenResp(updatedRespArray);
  };
  const getImage = (alt: string) => {
    if (alt === "Travelers") return Travelers.src;
    if (alt === "Amex") return Amex.src;
    if (alt === "ADP") return adp.src;
    if (alt === "apple") return Apple.src;
  };
  const { isDarkTheme } = React.useContext(AppContext);
  const classes = useStyles({ isDarkTheme });

  return (
    <Container className={classes.appContainer}>
      <Card raised={true} className={classes.contentBox}>
        <Slide direction="left" in={true}>
          <Typography
            variant="h5"
            variantMapping={{ h5: "h1" }}
            sx={{ fontWeight: "bold" }}
            align="center"
          >
            Experience
          </Typography>
        </Slide>
        <Slide direction="right" in={true}>
          <Divider className={classes.dividerStyle} />
        </Slide>
        <Stack className={classes.experienceAccordionStack}>
          {expData.map((exp, index) => {
            return (
              <Accordion key={index + exp.header}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack>
                    <Typography>{exp.header}</Typography>
                    <Typography variant="caption" paragraph={true}>
                      {exp.duration}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <CardMedia
                    component="img"
                    height="194"
                    image={getImage(exp.altImage)}
                    alt={exp.altImage}
                    sx={{ width: "auto", margin: "auto" }}
                  />
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                    aria-labelledby="description"
                    subheader={
                      <ListSubheader component="div" id="description">
                        Description
                      </ListSubheader>
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <WorkOutlineOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={exp.role} />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccessTimeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={exp.duration} />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocationOnOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={exp.location} />
                    </ListItemButton>
                    <ListItemButton component="button">
                      <ListItemIcon>
                        <WorkOutlineOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Responsibilities" />
                    </ListItemButton>
                    <List component="ul" className={classes.listStyleDisc}>
                      {exp?.Responsibilities?.length &&
                        exp.Responsibilities.map((resp) => {
                          return (
                            <ListItemButton sx={{ pl: 4 }} key={index + resp}>
                              <ListItem
                                button={false}
                                className={classes.listAsItem}
                              >
                                <Slide direction="left" in={true}>
                                  <ListItemText primary={resp} />
                                </Slide>
                              </ListItem>
                            </ListItemButton>
                          );
                        })}
                    </List>
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
        <Stack direction="row" className={classes.experienceCardsStack}>
          {expData.map((exp, index) => {
            return (
              <Card className={classes.experienceCard} key={index + exp.header}>
                <CardHeader title={exp.header} subheader={exp.subHeader} />
                <CardMedia
                  component="img"
                  height="194"
                  image={getImage(exp.altImage)}
                  alt={exp.altImage}
                  sx={{ width: "auto", margin: "auto" }}
                />
                <CardContent>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                    aria-labelledby="description"
                    subheader={
                      <ListSubheader component="div" id="description">
                        Description
                      </ListSubheader>
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <WorkOutlineOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={exp.role} />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccessTimeOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={exp.duration} />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocationOnOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={exp.location} />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleClick(exp.id)}>
                      <ListItemIcon>
                        <WorkOutlineOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Responsibilities" />
                      {openResp.includes(exp.id) ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openResp.includes(exp.id)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="ul" className={classes.listStyleDisc}>
                        {exp?.Responsibilities?.length &&
                          exp.Responsibilities.map((resp) => {
                            return (
                              <ListItemButton sx={{ pl: 4 }} key={index + resp}>
                                <ListItem
                                  button={false}
                                  className={classes.listAsItem}
                                >
                                  <Slide direction="left" in={true}>
                                    <ListItemText primary={resp} />
                                  </Slide>
                                </ListItem>
                              </ListItemButton>
                            );
                          })}
                      </List>
                    </Collapse>
                  </List>
                </CardContent>
              </Card>
            );
          })}
        </Stack>

        <Typography align="center" sx={{ pb: 2 }}>
          Further in-depth experience can be found on my &nbsp;
          <Link href="https://www.linkedin.com/in/yash-oza/">Linkedin</Link>
        </Typography>
      </Card>
    </Container>
  );
};
