"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/src/components/atoms/inputs/TextInput";
import { Button, Typography } from "@mui/material";
import styles from "@/src/app/auth/auth.module.scss";
import { useLogin } from "@/src/hooks/authHook";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSwitch: () => void;
  isLoading?: boolean;
}

const LoginForm = ({ onSwitch, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [message, setMessage] = useState<string | null>(null);
  const loginMutation = useLogin();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log("Login data:", data);
      await loginMutation.mutateAsync(data);
    } catch (error) {
      setMessage("Registration failed.Please try again");
    }
  };

  return (
    <>
      {message ? (
        <h6>{message}</h6>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <TextInput
            label="Email"
            type="email"
            className={styles.switchLink}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextInput
            label="Password"
            type="password"
            className={styles.switchLink}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            onClick={onSwitch}
            className={styles.switchLink}
            sx={{ mt: 2, cursor: "pointer" }}
          >
            Don't have an account? Register
          </Typography>
        </form>
      )}
    </>
  );
};

export default LoginForm;
