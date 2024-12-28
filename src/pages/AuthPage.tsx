import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const AuthPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"login" | "register">("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, register } = useApp();
	const navigate = useNavigate();

	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [bgStyles, setBgStyles] = useState({ left: 0, width: 0 });

	useEffect(() => {
		const activeTabIndex = activeTab === "login" ? 0 : 1;
		const activeTabElement = tabRefs.current[activeTabIndex];

		if (activeTabElement) {
			setBgStyles({
				left: activeTabElement.offsetLeft,
				width: activeTabElement.offsetWidth,
			});
		}
	}, [activeTab]);

	const handleLoginSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await login(email, password);
		if (success) {
			navigate("/");
		}
	};

	const handleRegisterSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await register(email, password, name);
		if (success) {
			navigate("/");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
				<h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
					Authentication
				</h2>
				<div className="relative mb-6">
					{/* Animated Background */}
					<div
						className="absolute h-10 bg-blue-200 rounded-lg transition-all duration-300 ease-out"
						style={{
							left: bgStyles.left,
							width: bgStyles.width,
						}}
					/>
					{/* Tabs */}
					<div className="flex space-x-2 relative z-10">
						<button
							ref={(el) => (tabRefs.current[0] = el)}
							onClick={() => setActiveTab("login")}
							className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
								activeTab === "login"
									? "text-gray-900"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Login
						</button>
						<button
							ref={(el) => (tabRefs.current[1] = el)}
							onClick={() => setActiveTab("register")}
							className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
								activeTab === "register"
									? "text-gray-900"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							Register
						</button>
					</div>
				</div>
				{activeTab === "login" ? (
					<form onSubmit={handleLoginSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>
						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
						>
							Login
						</button>
					</form>
				) : (
					<form onSubmit={handleRegisterSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>
						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
						>
							Register
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default AuthPage;
