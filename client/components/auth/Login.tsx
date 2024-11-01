import { LOGIN_ENDPOINT } from "@/utils/constants/endpoints";
import React, { useState } from "react";
import axios from "axios";
import router, { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@/features/slices/errorSlices";
import Error from "@/components/ui/Error";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
import { SOCIAL_LOGIN_ENDPOINT } from "@/utils/constants/endpoints";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = 'http://localhost:8800/api/social/social-login';

import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

type LoginSocialGoogleProps = {
  client_id: string;
  onResolve: (user: any) => Promise<void>;
  onReject: (error: any) => void;
  children?: React.ReactNode; 
};

const LoginSocialGoogle: React.ComponentType<LoginSocialGoogleProps> = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialGoogle),
  { ssr: false }
);

type LoginSocialFacebookProps = {
  appId: string;
  onResolve: (user: any) => Promise<void>;
  onReject: (error: any) => void;
  children?: React.ReactNode; // Thêm `children` vào đây nếu cần
};

const LoginSocialFacebook: React.ComponentType<LoginSocialFacebookProps> = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook),
  { ssr: false }
);

const getGoogleAuthUrl = () => {
  const scope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ].join(' ');

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=${encodeURIComponent(scope)}`;

  window.location.href = authUrl;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_ENDPOINT, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          setCookie(null, "auth_token", token, {
            maxAge: 30 * 24 * 60 * 60, 
            path: "/",
          });
          await router.push("/");
        } else {
          alert("Token không hợp lệ");
        }
      } else {
        alert("Đăng nhập không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đã xảy ra lỗi");
    }
  };

  const handleSocialLogin = async (user: any) => {
    console.log("Đăng nhập qua mạng xã hội thành công:", user);
    const id_token = user?.data?.id_token;
  
    if (id_token) {
      try {
        const response = await axios.post(SOCIAL_LOGIN_ENDPOINT, {
          token: id_token,
        });
  
        if (response.status === 200) {
          setCookie(null, "auth_token", response.data.authToken, {
            maxAge: 30 * 24 * 60 * 60, 
            path: "/",
          });
          await router.replace("/");
          dispatch(
            setError({ status: "success", message: "Đăng nhập thành công." })
          );
        } else {
          console.error("Lưu thông tin vào database thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi lưu vào database hoặc xác thực token:", error);
      }
    } else {
      console.error("Token không hợp lệ hoặc không tìm thấy.");
    }
  };

  const handleSocialLoginFailure = (error: any) => {
    console.error("Lỗi đăng nhập qua mạng xã hội:", error);
    dispatch(
      setError({
        status: "danger",
        message: "Lỗi khi đăng nhập qua mạng xã hội. Vui lòng thử lại.",
      })
    );
  };

  const { status, message } = useSelector((state: RootState) => state.error);

  return (
    <div>
      <div className="form_login absolute top-[55%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-[10] p-8 justify-center rounded-lg">
        <h2 className="text-2xl font-bold mb-6">LOGIN!</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-gray-600">
              You don't have an account yet?
            </a>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-600">Sau</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-between space-x-2">
          <LoginSocialGoogle
            client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            onResolve={handleSocialLogin}
            onReject={handleSocialLoginFailure}
          >
            <GoogleLoginButton className="w-3/4 flex items-center justify-center px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100" />
          </LoginSocialGoogle>

          <LoginSocialFacebook
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!}
            onResolve={handleSocialLogin}
            onReject={handleSocialLoginFailure}
          >
            <FacebookLoginButton className="w-3/4 flex items-center justify-center px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100" />
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  );
};

export default Login;
