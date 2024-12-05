import { LOGIN_ENDPOINT } from "@/utils/constants/endpoints";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(LOGIN_ENDPOINT, { email, password });
      localStorage.setItem("user", JSON.stringify(response.data));
      if (response.status === 200) {
        setCookie(null, "auth_token", response.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        if (response.data.isAdmin) {
          router.push("/");
        } else {
          setError("You are not allowed!");
        }
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div>
        <a className="hiddenanchor" id="signup"></a>
        <a className="hiddenanchor" id="signin"></a>
        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                  <button type="submit" className="btn btn-default submit">
                    Submit
                  </button>
                  <a className="reset_pass" href="#">
                    Lost your password?
                  </a>
                </div>
                <div className="clearfix"></div>
                <div className="separator">
                  <p className="change_link">
                    New to site?
                    <a href="#signup" className="to_register">
                      {" "}
                      Create Account{" "}
                    </a>
                  </p>
                  <div className="clearfix"></div>
                  <br />
                  <div>
                    <div className="flex justify-center">
                      <svg
                        className="mr-2"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="34.875px"
                        height="46.938px"
                        viewBox="0 0 34.875 46.938"
                        enableBackground="new 0 0 34.875 46.938"
                        xmlSpace="preserve"
                      >
                        <polyline
                          fill="none"
                          stroke="#C9AB81"
                          strokeMiterlimit="10"
                          points="0.5,0.003 0.5,36.438 22.875,36.438"
                        ></polyline>
                        <polyline
                          fill="none"
                          stroke="#C9AB81"
                          strokeMiterlimit="10"
                          points="6.5,5.003 6.5,41.438 28.875,41.438"
                        ></polyline>
                        <polyline
                          fill="none"
                          stroke="#C9AB81"
                          strokeMiterlimit="10"
                          points="12.5,10.003 12.5,46.438 34.875,46.438"
                        ></polyline>
                      </svg>
                      <h1 className="mr-5"> Laurent !</h1>

                    </div>
                    <p>
                      ©2016 All Rights Reserved. Gentelella Alela! is a
                      Bootstrap 4 template. Privacy and Terms
                    </p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
