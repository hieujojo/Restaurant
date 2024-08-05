// pages/_app.tsx\
import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/layout/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
