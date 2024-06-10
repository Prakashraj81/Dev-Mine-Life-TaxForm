import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../components/layouts/createEmotionCache";
import theme from '../components/layouts/theme/theme';
import { RecentSaveListProvider } from '../components/layouts/full/header/recent-save-lists-context';
import "../styles/index.css";
import '../styles/_container.css'
import '../styles/_sidebar.css'
import '../styles/responsive.css'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  //const theme = theme;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Mine life tax form</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}

        {/* <RecentSaveListProvider>
            {getLayout(<Component {...pageProps} />)}
        </RecentSaveListProvider> */}

      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
