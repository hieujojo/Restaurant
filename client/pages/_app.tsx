import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '@/store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="NEXT_PUBLIC_GOOGLE_CLIENT_ID">
      <Provider store={store}>
        <Head>
          <title>Moonlit Vintage</title>
          <meta name="description" content="Moonlit - Experience seamless table booking and restaurant utilities." />
          <link rel="icon" href="https://laurent.qodeinteractive.com/wp-content/uploads/2019/12/cropped-Icon-512-x-512-1-32x32.jpg" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
