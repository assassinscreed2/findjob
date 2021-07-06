import React,{useState} from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return <>
  <ThemeProvider theme={theme}>
    <Component {...pageProps} role/>
  </ThemeProvider>
  </>
}

export default MyApp