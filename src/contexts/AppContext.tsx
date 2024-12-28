/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, ReactNode, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useFilterSort } from "../hooks/useFilterSort";
import type { User } from "../api/auth/userAuth.api";
import type { CartItem } from "../helpet";
import { loginUser, logoutUser, registerUser } from "../api/auth/userAuth.api";
import { toast } from "react-toastify";

interface AppContextType {
	// Auth
	user: User | null;
	// loading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	register: (
		email: string,
		password: string,
		name: string
	) => Promise<boolean>;
	logout: () => Promise<boolean>;

	// Cart
	cart: CartItem[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addToCart: (item: any) => void;
	removeFromCart: (itemId: string, all?: boolean) => void;

	// Filter & Sort
	filters: {
		brand: string;
		size: string;
	};
	sortKey: string;
	handleFilterChange: (filters: { brand: string; size: string }) => void;
	handleSortChange: (key: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<any>(null);
	// const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const { cart, addToCart, removeFromCart } = useCart();
	const { filters, sortKey, handleFilterChange, handleSortChange } =
		useFilterSort();

	// useEffect(() => {
	// 	const checkAuthStatus = async () => {
	// 		try {
	// 			const userData = await checkAuthStatus();
	// 			setUser(userData);
	// 			setIsAuthenticated(!!userData);
	// 		} catch (error) {
	// 			console.error("Error checking auth status:", error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	checkAuthStatus();
	// }, []);

	//   useEffect(() => {
	//     const checkAuthStatus = async () => {
	//         const token = localStorage.getItem("jwtToken"); // Retrieve the token from local storage
	//         if (token) {
	//             try {
	//                 // Optionally, verify the token with the backend
	//                 const userData = await verifyToken(token); // Implement this function to verify the token
	//                 setUser(userData);
	//                 setIsAuthenticated(true);
	//             } catch (error) {
	//                 console.error("Token verification failed:", error);
	//                 // Optionally, clear the token if verification fails
	//                 localStorage.removeItem("jwtToken");
	//             }
	//         }
	//         // setLoading(false);
	//     };

	//     checkAuthStatus();
	// }, []);

	const login = async (email: string, password: string) => {
		try {
			const { user, token } = await loginUser({ email, password });
			setUser(user);
			setIsAuthenticated(true);
			localStorage.setItem("jwtToken", token);
			return true;
		} catch (error: any) {
			console.error("Login failed:", error);
			toast.error(error.message);
			return false;
		}
	};

	const register = async (email: string, password: string, name: string) => {
		try {
			const { user } = await registerUser({ email, password, name });
			setUser(user);
			setIsAuthenticated(true);
			return true;
		} catch (error: any) {
			console.error("Registration failed:", error.message);
			toast.error(error.message);
			return false;
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setUser(null);
			setIsAuthenticated(false);
			localStorage.removeItem("jwtToken");
			return true;
		} catch (error: any) {
			console.error("Logout failed:", error);
			toast.error(error.response?.data?.message || "Logout failed");
			return false;
		}
	};

	const value = {
		// Auth
		user,
		// loading,
		isAuthenticated,
		login,
		register,
		logout,

		// Cart
		cart,
		addToCart,
		removeFromCart,

		// Filter & Sort
		filters,
		sortKey,
		handleFilterChange,
		handleSortChange,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;

export function useApp() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
}
