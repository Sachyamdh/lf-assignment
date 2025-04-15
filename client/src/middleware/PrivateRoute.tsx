// src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

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

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/auth"); 
    }
  }, [pathname, router]);

  return <>{children}</>;
}
