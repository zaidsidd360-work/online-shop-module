import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import CartPage from "./pages/CartPage";
import TabContent from "./components/TabContent";

interface CartItem {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	item: any;
	quantity: number;
}

const App: React.FC = () => {
	const [filters, setFilters] = useState({ brand: "", size: "" });
	const [sortKey, setSortKey] = useState("");
	const [activeTab, setActiveTab] = useState("Filters");
	const [cart, setCart] = useState<CartItem[]>([]);

	const handleFilterChange = (newFilters: {
		brand: string;
		size: string;
	}) => {
		setFilters(newFilters);
	};

	const handleSortChange = (key: string) => {
		setSortKey(key);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const addToCart = (item: any) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(cartItem) => cartItem.item.id === item.id
			);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.item.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			}
			return [...prevCart, { item, quantity: 1 }];
		});
	};

	const removeFromCart = (itemId: string, all: boolean = false) => {
		console.log(itemId, all);
		setCart((prevCart) => {
			if (all) {
				return prevCart.filter(
					(cartItem) => cartItem.item.id.toString() !== itemId
				);
			}
			return prevCart
				.map((cartItem) =>
					cartItem.item.id.toString() === itemId
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				)
				.filter((cartItem) => cartItem.quantity > 0);
		});
	};

	return (
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
								<TabContent
									activeTab={activeTab}
									filters={filters}
									sortKey={sortKey}
									onFilterChange={handleFilterChange}
									onSortChange={handleSortChange}
									cart={cart}
									onAddToCart={addToCart}
									onRemoveFromCart={removeFromCart}
								/>
							</>
						}
					/>
					<Route
						path="/cart"
						element={
							<CartPage
								cart={cart}
								onAddToCart={addToCart}
								onRemoveFromCart={removeFromCart}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
