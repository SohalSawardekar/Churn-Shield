"use client"; // Only use in client-side components

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "./loadingScreen";

export default function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Show loading state while checking auth

    if (!session) {
      router.push("/login"); // Redirect if not logged in
    } else {
      // Redirect based on user role
      switch (session.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "customer":
          router.push("/customer");
          break;
        case "employee":
          router.push("/employee");
          break;
        default:
          router.push("/login"); // Unknown role, redirect to login
      }
    }
  }, [session, status, router]);

  if (status === "loading") return <LoadingScreen />; // Simple loading indicator

  return <>{children}</>; // Render children if authorized
}
