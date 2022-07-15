/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Card,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useStyles } from "../styles/useStyles";
import AppContext from "../AppContext";
import AboutMeDetails from "../content/about-me.json";
import dynamic from "next/dynamic";

//const Resume_Pdf = require("../documents/Yash_Oza_Resume.pdf").default;

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const AboutMe: React.FC = () => {
  const [showSummary, setShowSummary] = React.useState<boolean>(false);
  const [showSkills, setShowSkills] = React.useState<boolean>(false);
  const [showCertifications, setShowCertifications] =
    React.useState<boolean>(false);
  const { isDarkTheme } = React.useContext(AppContext);
  const classes = useStyles({ isDarkTheme });
  const languagesForChart = AboutMeDetails.skills.map((skill) => skill.title);
  const dataForChart = AboutMeDetails.skills.map((skill) => skill.data);
  return (
    <Container className={classes.appContainer}>
      <Card raised={true} className={classes.contentBox}>
        <Slide direction="left" in={true}>
          <Typography
            variant="h5"
            className={classes.boldWeight}
            variantMapping={{ h5: "h1" }}
            align="center"
          >
            About Me
          </Typography>
        </Slide>
        <Slide direction="right" in={true}>
          <Divider className={classes.dividerStyle} />
        </Slide>
        <Stack>
          <List>
            <ListItemButton onClick={() => setShowSummary(!showSummary)}>
              <ListItemIcon>
                {showSummary ? (
                  <MenuOpenIcon fontSize="large" />
                ) : (
                  <MenuIcon fontSize="large" />
                )}
              </ListItemIcon>
              <Typography
                variant="h5"
                align="center"
                gutterBottom={true}
                textAlign="center"
              >
                Summary
              </Typography>
            </ListItemButton>
            {showSummary && (
              <List
                component="ul"
                aria-label="summary"
                className={classes.listStyleDisc}
              >
                {AboutMeDetails?.summary &&
                  AboutMeDetails?.summary.map((sum, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ListItem button={false}>
                          <Slide
                            direction={index % 2 === 0 ? "left" : "right"}
                            in={true}
                          >
                            <ListItemText primary={sum} />
                          </Slide>
                        </ListItem>
                        <Divider className={classes.dividerStyle} />
                      </React.Fragment>
                    );
                  })}
                <ListItem>
                  <LocationOnOutlinedIcon /> <Typography>Edison, NJ</Typography>
                </ListItem>
              </List>
            )}
            <ListItemButton onClick={() => setShowSkills(!showSkills)}>
              <ListItemIcon>
                {showSummary ? (
                  <MenuOpenIcon fontSize="large" />
                ) : (
                  <MenuIcon fontSize="large" />
                )}
              </ListItemIcon>
              <Typography variant="h5" align="center" gutterBottom={true}>
                Skills
              </Typography>
            </ListItemButton>
            {showSkills && typeof window !== "undefined" && (
              <Chart
                options={{
                  chart: {
                    type: "bar",
                    height: 350,
                    foreColor: isDarkTheme ? "" : "#373d3f",
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      horizontal: true,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  xaxis: {
                    categories: languagesForChart,
                  },
                }}
                series={[
                  {
                    data: dataForChart,
                  },
                ]}
                type="bar"
                height={350}
              />
            )}
            <ListItemButton
              onClick={() => setShowCertifications(!showCertifications)}
            >
              <ListItemIcon>
                {showCertifications ? (
                  <MenuOpenIcon fontSize="large" />
                ) : (
                  <MenuIcon fontSize="large" />
                )}
              </ListItemIcon>
              <Typography variant="h5" align="center" gutterBottom={true}>
                Licenses and Certification.
              </Typography>
            </ListItemButton>
            {showCertifications && (
              <List
                component="ul"
                aria-label="summary"
                className={classes.listStyleDisc}
              >
                {AboutMeDetails?.certifications &&
                  AboutMeDetails?.certifications.map((cert, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ListItem button={false} sx={{ ml: 3, mb: 3 }}>
                          <ListItemIcon>
                            <img src={cert.icon} alt={cert.alt}></img>
                          </ListItemIcon>
                          <Stack sx={{ ml: 3 }}>
                            <ListItemText
                              primary={cert.title}
                              secondary={cert.caption}
                            />
                            <ListItemText secondary={cert.duration} />
                            <Chip
                              label="Show Certification"
                              component="a"
                              href={cert.creds}
                              variant="outlined"
                              clickable
                              target="_blank"
                            />
                          </Stack>
                        </ListItem>
                        <Divider className={classes.dividerStyle} />
                      </React.Fragment>
                    );
                  })}
              </List>
            )}
          </List>
        </Stack>
      </Card>
      <Stack className={classes.downloadBlock}>
        <a
          download="Yash_Oza"
          href="Yash_Oza_Resume.pdf"
          className={classes.downloadLinks}
        >
          &#9733; &nbsp;Download Resume as PDF &nbsp;&#9733;
        </a>
      </Stack>
    </Container>
  );
};
