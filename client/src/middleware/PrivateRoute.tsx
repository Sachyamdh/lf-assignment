"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const publicRoutes = ["/", "/home", "/auth"];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const pathname = window.location.pathname;

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/auth");
    } else if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api.v1/auth/verify-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );

          if (!response.ok) {
            throw new Error("Token verification failed");
          }
        } catch (error) {
          console.error("Token verification error:", error);
          router.replace("/auth");
        }
      };

      verifyToken();
    }
  }, [router]);

  return <>{children}</>;
}
