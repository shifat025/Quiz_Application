import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";
import Cookies from 'js-cookie';


export const useAxios = () => {
  const { auth, setAuth } = useAuth();
  // console.log(auth);

  useEffect(() => {
    // Add a request intercepter

    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken ;
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
        if (error.response.status === 401 && !orginalRequest._retry) {
          orginalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await api.post("/auth/refresh-token", {
              refreshToken,
            });

            const { accessToken } = response.data.data;
            setAuth({ ...auth, authToken: accessToken });

             // Update cookies
             Cookies.set("authToken", accessToken, { secure: true, sameSite: "Strict" });

            orginalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return axios(orginalRequest);
          } catch (error) {
            console.error("Failed to refresh token:", error);
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
