"use client";
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface TextInputProps extends Omit<TextFieldProps, "name"> {
  name: string;
  error?: boolean;
  className: string;
  helperText?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = "text", className, ...props }, ref) => {
    return (
      <TextField
        type={type}
        className={className}
        fullWidth
        margin="normal"
        inputRef={ref}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--color-foreground-primary)",
            },
            "&:hover fieldset": {
              borderColor: "var(--color-foreground-primary)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-foreground-primary)",
            },
            "& input": {
              color: "var(--color-foreground-primary)",
            },
            " & textarea": {
              color: "var(--color-foreground-primary)",
            },
          },

          "& .MuiInputLabel-root": {
            color: "var(--color-foreground-primary)",
            "&.Mui-focused": {
              color: "var(--focus-text-color)",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--color-foreground-primary)",
            "&.Mui-focused": {
              color: "var(--focus-text-color)",
            },
          },
          "& .MuiFormHelperText-root": {
            color: "var(--color-foreground-primary)",
          },
          "@media (prefers-color-scheme: light)": {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
              "& input": {
                color: "black",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",
            },
            "& .MuiFormHelperText-root": {
              color: "black",
            },
          },
        }}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
