import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  logout,
  register,
  getCurrentUser,
} from "@/src/services/authService";
import { useRouter } from "next/navigation";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      localStorage.setItem("token", user.token);
      router.push("/notes");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess:((response)=>{
        return response.message
    }),
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/home");
    },
  });
}
