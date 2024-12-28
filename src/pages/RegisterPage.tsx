import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterPage: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		const success = await register(email, password, name);
		if (success) {
			navigate("/");
		} else {
			setError("Registration failed. Please try again.");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-sm">
			<h2 className="text-2xl font-bold mb-6">Register</h2>
			{error && <div className="text-red-500 mb-4">{error}</div>}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full px-3 py-2 border rounded-lg"
						required
					/>
				</div>
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
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
