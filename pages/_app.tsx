//import { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/_container.css'
import '../styles/_sidebar.css'
import '../styles/responsive.css'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FullLayout from './../components/layouts/FullLayout';
import theme from './../components/theme/theme';
import Meta from '../components/meta';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
          <Component {...pageProps} />
        </FullLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

