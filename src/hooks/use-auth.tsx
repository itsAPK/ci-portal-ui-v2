"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter,usePathname } from "next/navigation";
import {getCookie} from "cookies-next";

const freeRoutes = ['/jobs','/companies','/candidates','/auth/login','/auth/register','/auth/forgot-password','/auth/reset-password','/auth/logout'];

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const session = typeof window !== "undefined" && getCookie("ci-portal.access_token");

    const path = usePathname();
    useEffect(() => {
      if (!session) {
        redirect("/auth/login");
      }
     
    }, []);

    if (!session) {
      return null;
    }
    return (<WrappedComponent {...props} />);
  };
};