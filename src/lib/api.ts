import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";

export const BASEURL = "https://ci-portal-api.imapk.xyz/api";
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

  if (isServer) {
    const { cookies } = await import("next/headers");
    jwtToken = cookies().get("vrkjobs.access_token")?.value;
  }

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

export const jobApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOB_API_URL,
});


const jobLog = (
  message: string,
  log?: AxiosResponse | InternalAxiosRequestConfig | AxiosError
) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message, log);
  }
};

jobApi.interceptors.request.use(async (request) => {
  let jwtToken: any = getCookie("ci-portal.access_token");
  const { method, url } = request;

  if (isServer) {
    const { cookies } = await import("next/headers");
    jwtToken = cookies().get("vrkjobs.access_token")?.value;
  }

  if (jwtToken) {
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  log(`- [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

jobApi.interceptors.response.use(
  async (response) => {
    const { method, url } = response.config;
    const { status } = response;

    jobLog(
      `- [${method?.toUpperCase()}] ${url} | Response ${status}`,
      response
    );
    if (status === 401) {
      redirect("/auth/login");
    }
    return response;
  },
  async (error) => {
    const { message } = error;
    const { status, data } = error.response;
    const { method, url } = error;
    console.log(error.response.status);
    jobLog(
      `- [${method?.toUpperCase()}] ${ url} | Error ${status} ${data?.message || ""} | ${message}`,
      error
    );
    if (error.response.status === 401) {
      window.location.replace("/auth/login");
    }

    return Promise.reject(error);
  }
);

export const apiWithoutAuth = axios.create({
  baseURL: BASEURL,
});


apiWithoutAuth.interceptors.request.use(async (request) => {
  let jwtToken: any = getCookie("ci-portal.access_token");
  const { method, url } = request;

  if (isServer) {
    const { cookies } = await import("next/headers");
    jwtToken = cookies().get("vrkjobs.access_token")?.value;
  }

  if (jwtToken) {
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  log(`- [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

apiWithoutAuth.interceptors.response.use(
  async (response) => {
    const { method, url } = response.config;
    const { status } = response;

    jobLog(
      `- [${method?.toUpperCase()}] ${url} | Response ${status}`,
      response
    );
   
    return response;
  },
  async (error) => {
    const { message } = error;
    const { status, data } = error.response;
    const { method, url } = error;
    console.log(error.response.status);
    jobLog(
      `- [${method?.toUpperCase()}] ${ url} | Error ${status} ${data?.message || ""} | ${message}`,
      error
    );
  

    return Promise.reject(error);
  }
);

export const jobApiWithoutAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JOB_API_URL,
});
 
jobApiWithoutAuth.interceptors.request.use(async (request) => {
  let jwtToken: any = getCookie("ci-portal.access_token");
  const { method, url } = request;

  if (isServer) {
    const { cookies } = await import("next/headers");
    jwtToken = cookies().get("vrkjobs.access_token")?.value;
  }

  if (jwtToken) {
    request.headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  log(`- [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

jobApiWithoutAuth.interceptors.response.use(
  async (response) => {
    const { method, url } = response.config;
    const { status } = response;

    jobLog(
      `- [${method?.toUpperCase()}] ${url} | Response ${status}`,
      response
    );
    // if (status === 401) {
    //   redirect("/auth/login");
    // }
    return response;
  },
  async (error) => {
    const { message } = error;
    const { status, data } = error.response;
    const { method, url } = error;
    console.log(error.response.status);
    jobLog(
      `- [${method?.toUpperCase()}] ${ url} | Error ${status} ${data?.message || ""} | ${message}`,
      error
    );
    // if (error.response.status === 401) {
    //   window.location.replace("/auth/login");
    // }

    return Promise.reject(error);
  }
);