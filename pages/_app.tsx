import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { Layout } from "../components/Layout";
import Head from "next/head";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";

import createEmotionCache from "../utility/createEmotionCache";
import {
  lightThemeOptions,
  DarkThemeOptions,
} from "../styles/theme/themeOptions";
import AppContext from "../AppContext";
import "../styles/globals.css";
const Yash = require("../images/Yash.ico").default;
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(DarkThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(false);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CacheProvider value={emotionCache}>
        <AppContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
          <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <Head>
              <link rel="shortcut icon" href={Yash.src} type="image/png/ico" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
              />
              <meta name="theme-color" content="#000000" />
              <meta
                name="description"
                content="I'm a Edison, NJ based full stack software engineer focusing on software development - font end, back end, deployment and aws."
              />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="Yash Oza" />
              <meta
                property="og:description"
                content="I'm a Edison, NJ based full stack software engineer focusing on software development - font end, back end, deployment and aws."
              />
              <meta property="og:url" content="https://www.yashvoza.com/home" />
              <meta property="og:site_name" content="Yash Oza" />
              <meta name="twitter:title" content="Yash Oza" />
              <title>Yash Oza</title>
            </Head>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AppContext.Provider>
      </CacheProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
