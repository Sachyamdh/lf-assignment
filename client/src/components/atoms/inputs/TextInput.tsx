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
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
            "& input": {
              color: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiFormHelperText-root": {
            color: "white",
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
