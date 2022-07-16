import * as React from "react";
import {
  Box,
  Card,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  Slide,
  Stack,
  Typography,
  Button,
  CardHeader,
  CircularProgress,
  TextField,
  Alert,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useStyles } from "../styles/useStyles";
import AppContext from "../AppContext";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

interface callApiProps {
  subject: string;
  from: string;
  body: string;
}

export const ContactMe: React.FC = () => {
  const { isDarkTheme } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const classes = useStyles({ isDarkTheme });
  const callApi = async (data: callApiProps) => {
    setIsLoading(true);
    const { subject, from, body } = data;
    if (process.env.SEND_EMAIL_URL) {
      const { data: sendEmailData } = await axios.post(
        process.env.SEND_EMAIL_URL,
        { subject, body, from }
      );
      setIsLoading(false);
      resetField("subject");
      if (sendEmailData.message === "MAIL SENT SUCCESSFULLY!!") {
        setMessage("success");
      }
    } else {
      throw new Error("SEND_EMAIL_URL not defined");
    }
  };
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
            Contact Me
          </Typography>
        </Slide>
        <Slide direction="right" in={true}>
          <Divider className={classes.dividerStyle} />
        </Slide>
        <Stack sx={{ alignItems: "center" }}>
          <Box className="cotact-me">
            <Typography
              variant="h6"
              variantMapping={{ h6: "h2" }}
              sx={{ pl: 1 }}
            >
              You can react out to me using below details
            </Typography>
            <List component="ul">
              <ListItem button={false}>
                <Link
                  href="https://www.linkedin.com/in/yash-oza"
                  underline="none"
                >
                  <Typography variant="h5" gutterBottom={true}>
                    <LinkedInIcon /> LinkedIn
                  </Typography>
                </Link>
              </ListItem>
              <ListItem button={false}>
                <Link href="mailto:yashmichael@gmail.com" underline="none">
                  <Typography variant="h5" gutterBottom={true}>
                    <EmailOutlinedIcon /> Email
                  </Typography>
                </Link>
              </ListItem>
            </List>
            <Typography
              variant="h6"
              variantMapping={{ h6: "h2" }}
              sx={{ pl: 1 }}
            >
              You can also access my Github using below Link
            </Typography>
            <List component="ul">
              <ListItem button={false}>
                <Link href="https://github.com/yoza13" underline="none">
                  <Typography variant="h5" gutterBottom={true}>
                    GitHub
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Card>
      {message === "success" && (
        <Alert severity="success" sx={{ mt: 5, mb: 5 }}>
          <Typography variant="h5">Mail sent !!!!!!!</Typography>
        </Alert>
      )}
      <Card raised={true}>
        <CardHeader title="Contact Form" />
        <Box
          sx={{ width: "50%", marginLeft: "5rem" }}
          component="form"
          // @ts-ignore comment.
          onSubmit={handleSubmit(callApi)}
          onClick={() => setMessage("")}
        >
          <Stack direction="column">
            <Controller
              name="subject"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    id="outlined-required"
                    label="Subject"
                    placeholder="Enter Subject"
                    sx={{ marginBottom: "1rem" }}
                    error={errors?.subject && true}
                    helperText={errors?.subject && "Enter Subject"}
                  />
                );
              }}
            ></Controller>
            <Controller
              name="from"
              control={control}
              rules={{
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
              }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    id="outlined-required"
                    label="From email"
                    placeholder="Enter Email"
                    sx={{ marginBottom: "1rem" }}
                    error={errors?.from && true}
                    helperText={
                      errors?.from && String(errors?.from?.type) === "pattern"
                        ? "Enter Correct email"
                        : "Enter Email"
                    }
                  />
                );
              }}
            ></Controller>
            <Controller
              name="body"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    id="outlined-multiline-static"
                    placeholder="Enter a brief description describing the reason you are sending email"
                    label="Body"
                    multiline
                    rows={10}
                    sx={{ marginBottom: "1rem" }}
                    variant="outlined"
                    error={errors?.body && true}
                    helperText={errors?.body && "Enter Details"}
                  />
                );
              }}
            ></Controller>
            <Button
              type="submit"
              size="large"
              sx={{ margin: "auto", width: "100%" }}
            >
              Send Email
            </Button>
          </Stack>
        </Box>
      </Card>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};
