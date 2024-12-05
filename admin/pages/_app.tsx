import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { store } from '../store/store';
import '../styles/globals.css';
import '../public/vendors/bootstrap/dist/css/bootstrap.min.css';
import '../public/vendors/font-awesome/css/font-awesome.min.css';
import '../public/vendors/nprogress/nprogress.css';
import '../public/vendors/iCheck/skins/flat/green.css';
import '../public/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css';
import '../public/vendors/jqvmap/dist/jqvmap.min.css';
import '../public/vendors/bootstrap-daterangepicker/daterangepicker.css';
import '../public/build/css/custom.min.css';
import { Provider } from 'react-redux';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { auth_token } = parseCookies();

    if (!auth_token && router.pathname !== '/login') {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return null; 
  }

  return <Provider store={store}>
  <Component {...pageProps} />
  </Provider>;
};

export default MyApp;
