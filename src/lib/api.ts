import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";

export const BASEURL = "https://ciportalapi.imapk.xyz/api";
const isServer = typeof window === "undefined";


const api = axios.create({
  baseURL: BASEURL,
});



const log = (
  message: string,
  log?: AxiosResponse | InternalAxiosRequestConfig | AxiosError
) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message, log);
  }
};

api.interceptors.request.use(async (request) => {
  let jwtToken: any = getCookie("ci-portal.access_token");
  const { method, url } = request;

 

  if (jwtToken) {
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  log(`- [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

api.interceptors.response.use(
  async (response) => {
    const { method, url } = response.config;
    const { status } = response;

    log(`- [${method?.toUpperCase()}] ${url} | Response ${status}`, response);
    if (status === 401) {
      redirect("/auth/login");
    }
    return response;
  },
  async (error) => {
    const { message } = error;
    const { status, data } = error.response;
    const { method, url } = error.config;

    log(
      `- [${method?.toUpperCase()}] ${url} | Error ${status} ${data?.message || ""} | ${message}`,
      error
    );
    if (status === 401) {
      console.log(true);
      window.location.replace("/auth/login");
    }

    return Promise.reject(error);
  }
);

export default api;



