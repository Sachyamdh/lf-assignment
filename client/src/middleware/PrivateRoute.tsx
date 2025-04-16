"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = ["/", "/home", "/auth"];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Skip verification for public routes
    if (publicRoutes.includes(pathname)) {
      return;
    }

    if (!token) {
      router.replace("/auth");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
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
        localStorage.removeItem("token");
        router.replace("/auth");
      }
    };

    verifyToken();
  }, [router, pathname]);

  return <>{children}</>;
}