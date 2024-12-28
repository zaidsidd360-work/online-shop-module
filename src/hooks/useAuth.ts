import { useState } from "react";
import {
	loginUser,
	logoutUser,
	registerUser,
	// checkAuthStatus,
} from "../api/auth/userAuth.api";

export function useAuth() {
	const [user, setUser] = useState(null);
	// const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// useEffect(() => {
	// 	const init = async () => {
	// 		try {
	// 			const user = await checkAuthStatus();
	// 			// setUser(user);
	// 		} catch (err) {
	// 			setError(
	// 				err instanceof Error ? err.message : "An error occurred"
	// 			);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	init();
	// }, []);

	const login = async (email: string, password: string) => {
		try {
			setError(null);
			const { user } = await loginUser({ email, password });
			console.log(user);
			setUser(user);
			return true;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
			return false;
		}
	};

	const register = async (email: string, password: string, name: string) => {
		try {
			setError(null);
			const user = await registerUser({ email, password, name });
			setUser(user);
			return true;
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Registration failed"
			);
			return false;
		}
	};

	const logout = async () => {
		try {
			setError(null);
			await logoutUser();
			setUser(null);
			return true;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Logout failed");
			return false;
		}
	};

	const clearError = () => {
		setError(null);
	};

	return {
		user,
		// loading,
		error,
		login,
		register,
		logout,
		clearError,
		isAuthenticated: !!user,
	};
}
