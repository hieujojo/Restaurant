import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
// import { Inter } from 'next/font/google';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  ) 
};

export default MyApp;
