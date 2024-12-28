import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import CartPage from "./pages/CartPage";
import TabContent from "./components/TabContent";
import AppProvider from "./contexts/AppContext";
import AuthPage from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState("Filters");

	return (
		<AppProvider>
			<ToastContainer />
			<Router>
				<div className="min-h-screen bg-gray-50 text-gray-900">
					<Header />
					<Routes>
						<Route
							path="/"
							element={
								<>
									<Tabs
										activeTab={activeTab}
										onTabChange={setActiveTab}
									/>
									<TabContent activeTab={activeTab} />
								</>
							}
						/>
						<Route path="/auth" element={<AuthPage />} />
						<Route path="/cart" element={<CartPage />} />
					</Routes>
				</div>
			</Router>
		</AppProvider>
	);
};

export default App;
