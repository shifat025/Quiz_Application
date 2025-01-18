import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import useAuth from "./useAuth";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add a request intercepter
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        console.log("this is request auth", auth);
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response intercepter

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const orginalRequest = error.config;
        if (error.response?.status === 401 && !orginalRequest._retry) {
          orginalRequest._retry = true;

          try {
            const userRefreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken: userRefreshToken }
            );

            const { accessToken, refreshToken } = response.data.data;
            console.log("new access token", accessToken);
            console.log("new refresh token", refreshToken);
            setAuth({ ...auth, authToken: accessToken, refreshToken });
            console.log("this is response auth", auth);

            // Update cookies
            Cookies.set("authToken", accessToken, {
              secure: true,
              sameSite: "Strict",
            });
            Cookies.set("refreshToken", refreshToken, {
              secure: true,
              sameSite: "Strict",
            });

            orginalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return axios(orginalRequest);
          } catch (error) {
            console.log(
              "This is refresh response",
              error.response.data.message
            );
            console.error("Failed to refresh token:", error);

            // Navigate to the login page
            Cookies.remove("authToken");
            Cookies.remove("refreshToken");
            Cookies.remove("user");
            navigate("/login");
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return { api };
};
