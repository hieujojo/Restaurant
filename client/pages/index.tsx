import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Error from '@/components/ui/Error';
import HomeComponents from '@/components/Home/HomeComponents';
import { GoogleOAuthProvider } from '@react-oauth/google'


const clientId = "NEXT_PUBLIC_GOOGLE_CLIENT_ID";  

export default function Home() {
  const { status, message } = useSelector((state: RootState) => state.error);
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div>
      <div className="z-10">
        {status && message && <Error state={status} message={message} />}
      </div>
      <HomeComponents/>
    </div>
    </GoogleOAuthProvider>
  );
}

