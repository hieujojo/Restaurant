import { REGISTER_ENDPOINT } from "@/utils/constants/endpoints";
import axios from "axios";
import router, { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCookie } from "nookies";
import dynamic from "next/dynamic";
import { setError } from "@/features/slices/errorSlices";
import { RootState } from "@/store/store";

import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";

const LoginSocialGoogle = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialGoogle),
  { ssr: false }
);
const LoginSocialFacebook = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook),
  { ssr: false }
);

interface FormData {
  name: string;
  email: string;
  password: string;
}
const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (validateData: FormData) => {
    const errors: Partial<FormData> = {};

    if (!validateData.name) {
      errors.name = "name is required";
    }
    if (!validateData.email) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-z]+/.test(validateData.email)) {
      errors.email = "Invalid email address";
    }

    if (!validateData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data", formData);
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      const data = new FormData();
      for (const key in formData) {
        const value = formData[key as keyof FormData];
        if (typeof value === "boolean") {
          data.append(key, value ? "true" : "false");
        } else {
          data.append(key, value);
        }
      }
      try {
        const response = await axios.post(REGISTER_ENDPOINT, data);
        if (response.status === 200) {
          alert("User has been created.");
        } else {
          alert("Error creating user.");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Error creating user.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSocialLogin = (user: any) => {
    console.log("Đăng nhập qua mạng xã hội thành công:", user);
    const token = user?.token;
    if (token) {
      setCookie(null, "auth_token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      router.push("/");
      dispatch(
        setError({ status: "success", message: "Đăng nhập thành công." })
      );
    }
  };

  const handleSocialLoginFailure = (error: any) => {
    console.error("Social login error:", error);
  };

  return (
    <div>
      <div className="form_login absolute top-[55%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-[10] p-8 justify-center rounded-lg">
        <h2 className="text-2xl font-bold mb-6">REGISTER!</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleChange}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <a href="/login" className="text-sm text-gray-600">
              You already have an account?
            </a>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Register
            </button>
          </div>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-600">Sau</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-between space-x-4">
          <LoginSocialGoogle
            client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            onResolve={handleSocialLogin}
            onReject={handleSocialLoginFailure}
          >
            <GoogleLoginButton className="w-3/4 flex items-center justify-center px-2 py-1 text-sm  border border-gray-300 rounded-md hover:bg-gray-100" />
          </LoginSocialGoogle>

          <LoginSocialFacebook
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!}
            onResolve={handleSocialLogin}
            onReject={handleSocialLoginFailure}
          >
            <FacebookLoginButton className="w-3/4 flex items-center justify-center px-2 py-1 text-sm  border border-gray-300 rounded-md hover:bg-gray-100" />
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  );
};

export default Register;
