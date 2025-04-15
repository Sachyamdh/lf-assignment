"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/src/components/atoms/inputs/TextInput";
import { Button, StyledEngineProvider, Typography } from "@mui/material";
import styles from "@/src/app/auth/auth.module.scss";
import { useRegister } from "@/src/hooks/authHook";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSwitch: () => void;
  isLoading?: boolean;
}

const RegisterForm = ({ onSwitch, isLoading }: RegisterFormProps) => {
  const [formVisible, setFormVisible] = useState(true); 
  const [message, setMessage] = useState<string | null>(null); 

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegister();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync(data);
      console.log("sign up", registerMutation.data.message);
      if (registerMutation.isSuccess) {
        setMessage(registerMutation.data?.message);
        setFormVisible(false);
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      // window.location.reload();
    }
  };
  console.log("here", message);
  const password = watch("password");

  return (
    <div>
      {formVisible ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>

          <div style={{ display: "flex", gap: "16px" }}>
            <TextInput
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register("firstName", { required: "First name is required" })}
              className={styles.switchLink}
            />

            <TextInput
              label="Last Name"
              className={styles.switchLink}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register("lastName", { required: "Last name is required" })}
            />
          </div>

          <TextInput
            label="Username"
            error={!!errors.userName}
            className={styles.switchLink}
            helperText={errors.userName?.message}
            {...register("userName", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
          />

          <TextInput
            label="Email"
            className={styles.switchLink}
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

          <TextInput
            label="Password"
            className={styles.switchLink}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <TextInput
            label="Confirm Password"
            className={styles.switchLink}
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            onClick={onSwitch}
            className={styles.switchLink}
            sx={{ mt: 2, cursor: "pointer" }}
          >
            Already have an account? Login
          </Typography>
        </form>
      ) : (
        <h6>{message}</h6>
      )}
    </div>
  );
};

export default RegisterForm;
