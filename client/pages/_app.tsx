import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Layout/Footer';
import { store } from '@/store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="NEXT_PUBLIC_GOOGLE_CLIENT_ID">
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </GoogleOAuthProvider>

  );
}

export default MyApp;
