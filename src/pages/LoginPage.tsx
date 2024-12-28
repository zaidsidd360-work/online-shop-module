import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		const success = await login(email, password);
		if (success) {
			navigate("/");
		} else {
			setError("Invalid credentials");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Login</h2>
			{error && <div className="text-red-500 mb-4">{error}</div>}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border rounded-lg"
						required
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 mb-2">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border rounded-lg"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
