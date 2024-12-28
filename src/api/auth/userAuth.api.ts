import axios, { AxiosError } from "axios";
import { ReactNode } from "react";

// process.env.REACT_APP_API_URL ||
const API_URL = "http://localhost:3000";

interface LoginCredentials {
	email: string;
	password: string;
}

interface RegisterCredentials extends LoginCredentials {
	name: string;
}

export interface User {
	[x: string]: ReactNode;
	id: string;
	email: string;
	name: string;
}

// Configure axios defaults
axios.defaults.withCredentials = true; // Important for handling cookies
axios.defaults.baseURL = API_URL;

/**
 * Login user with email and password
 */
export const loginUser = async (
	credentials: LoginCredentials
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
	try {
		const { data } = await axios.post<User>("/api/auth/login", credentials);
		return data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message);
		}
		throw error;
	}
};

/**
 * Register new user
 */
export const registerUser = async (
	credentials: RegisterCredentials
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
	try {
		const { data } = await axios.post<User>(
			"/api/auth/register",
			credentials
		);
		return data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message);
		}
		throw error;
	}
};

/**
 * Logout current user
 */
export const logoutUser = async (): Promise<void> => {
	try {
		await axios.post("/api/auth/logout");
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message);
		}
		throw error;
	}
};

/**
 * Check current authentication status
 */
export const checkAuthStatus = async (): Promise<User | null> => {
	try {
		const { data } = await axios.get<User>("/api/auth/status");
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				return null;
			}
			throw new Error(
				error.response?.data?.message || "Failed to check auth status"
			);
		}
		throw error;
	}
};

/**
 * Request password reset email
 */
export const requestPasswordReset = async (email: string): Promise<void> => {
	try {
		await axios.post("/api/auth/forgot-password", { email });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message ||
					"Failed to request password reset"
			);
		}
		throw error;
	}
};

/**
 * Reset password with token
 */
export const resetPassword = async (
	token: string,
	newPassword: string
): Promise<void> => {
	try {
		await axios.post("/api/auth/reset-password", {
			token,
			newPassword,
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message || "Failed to reset password"
			);
		}
		throw error;
	}
};

/**
 * Update user profile
 */
export const updateProfile = async (
	updates: Partial<Omit<User, "id">>
): Promise<User> => {
	try {
		const { data } = await axios.patch<User>("/api/auth/profile", updates);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message || "Failed to update profile"
			);
		}
		throw error;
	}
};
