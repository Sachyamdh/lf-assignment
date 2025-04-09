const { z } = require("zod");

const registerSchema = z
  .object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    userName: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(15),
    confirmPassword: z.string().min(6).max(15),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15),
});

module.exports = { registerSchema, loginSchema };
