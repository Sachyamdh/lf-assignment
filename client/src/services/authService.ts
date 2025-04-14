import axios from "axios";
import { RegisterType, LoginType } from "@/src/types/userType";
import { extractToken } from "../utils/tokenExttractor";
import handleError from "./errorHandler";

const API_URL = process.env.API_URL;

export async function login(
  credentials: LoginType
): Promise<{ token: string; data: any }> {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    const authHeader = response.headers["authorization"];
    if (!authHeader) throw Error("No token provided");
    const token = extractToken(authHeader) as string;

    return { token: token, data: response.data };
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function register(
  userData: RegisterType
): Promise<{ token: string; data: any }> {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);

    if (response.status !== 200) {
      throw new Error("Registration failed");
    }

    const authHeader = response.headers["authorization"];
    if (!authHeader) throw Error("No token provided");
    const token = extractToken(authHeader) as string;

    return { token: token, data: response.data };
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    handleError(error);
    
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get(`${API_URL}/auth/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
