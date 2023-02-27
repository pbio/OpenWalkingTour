import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CssBaseline, Container } from '@mui/material';





// Client-side cache, shared for the whole session of the user in the browser.



export default function MyApp({ Component, pageProps }: AppProps) {

  return (<>
        <Head>
          <title>Open Walking Tour</title>
          <link rel="icon" href="/favicon.ico" /> 
        </Head>
          <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          
            <Component {...pageProps } />
        </>
  );
}
