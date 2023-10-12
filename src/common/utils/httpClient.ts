import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { clearLocalStorage } from "./authUtils";

const TIMEOUT = 0;
const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  BodyError = 400,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export const httpClient = axios.create({
  headers: defaultHeaders,
});

httpClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("access_token");
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return handleError(error);
  },
);

const handleError = async (error: AxiosError) => {
  console.log("Error in axios", error);
  if (error.response) {
    const status: StatusCode | undefined = error?.response?.status
      ? (error.response.status as StatusCode)
      : undefined;

    switch (status) {
      case StatusCode.InternalServerError: {
        break;
      }

      case StatusCode.TooManyRequests: {
        break;
      }

      case StatusCode.Unauthorized: {
        try {
          const originalConfig = error.config as AxiosRequestConfig & {
            _retry?: boolean;
          };
          const refresh = localStorage.getItem("refresh");
          if (error.config && error.response && refresh) {
            if (!originalConfig._retry) {
              originalConfig._retry = true;
              const res = await httpClient.post(
                `/api/admin-api/auth/refresh-token`,
                {
                  refresh,
                },
              );
              localStorage.setItem("access", res.data.access);
              originalConfig.headers.Authorization = `Bearer ${localStorage.getItem(
                "access",
              )}`;
              return axios(originalConfig);
            }
          }
        } catch (err) {
          goToAuth();
          return;
        }
        break;
      }
    }
  }

  return Promise.reject(error);
};

const goToAuth = () => {
  clearLocalStorage();
  window.location.href = "/";
};
