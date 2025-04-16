import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  logout,
  register,
  getCurrentUser,
} from "@/src/services/authService";
import { useRouter } from "next/navigation";

export function useUser() {
  return useQuery<boolean | null>({
    queryKey: ["user"],
    queryFn: () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      return token ? true : false;
    },
    retry: false,
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: async (user) => {
      localStorage.setItem("token", user.token);
      await Promise.resolve();
      router.push("/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      return response.message;
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.setQueryData(["user"], { isAuthenticated: false });
      queryClient.removeQueries();
      router.push("/home");
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
}
