import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const FilterSection: React.FC = () => {
	const {
		filters,
		sortKey,
		handleFilterChange,
		handleSortChange,
		cart,
		user,
		logout,
	} = useApp();

	console.log(user);
	console.log(cart);

	return (
		<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-300 max-w-6xl mx-auto mb-4 sm:mb-8 gap-4">
			{/* Filters Section */}
			<div className="flex flex-wrap sm:flex-row gap-4 sm:gap-6 items-center">
				{/* Brand Filter */}
				<select
					value={filters.brand}
					onChange={(e) =>
						handleFilterChange({
							...filters,
							brand: e.target.value,
						})
					}
					className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
				>
					<option value="">All Brands</option>
					<option value="Honeywell">Honeywell</option>
					<option value="3M">3M</option>
					<option value="Nordic Pure">Nordic Pure</option>
					<option value="FilterBuy">FilterBuy</option>
					<option value="Aerostar">Aerostar</option>
					<option value="Apex">Apex</option>
					<option value="Lennox">Lennox</option>
				</select>

				{/* Size Filter */}
				<select
					value={filters.size}
					onChange={(e) =>
						handleFilterChange({ ...filters, size: e.target.value })
					}
					className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
				>
					<option value="">All Sizes</option>
					<option value="14x14x1">14x14x1</option>
					<option value="14x25x1">14x25x1</option>
					<option value="16x20x1">16x20x1</option>
					<option value="16x20x4">16x20x4</option>
					<option value="16x25x4">16x25x4</option>
					<option value="20x20x1">20x20x1</option>
					<option value="20x20x4">20x20x4</option>
					<option value="20x25x1">20x25x1</option>
					<option value="20x30x1">20x30x1</option>
					<option value="24x24x1">24x24x1</option>
				</select>
			</div>

			{/* Sort & Cart Section */}
			<div className="flex flex-row gap-6 items-center">
				{/* Sort Options */}
				<select
					value={sortKey}
					onChange={(e) => handleSortChange(e.target.value)}
					className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
				>
					<option value="">Sort By</option>
					<option value="priceAsc">Price: Low to High</option>
					<option value="priceDesc">Price: High to Low</option>
				</select>

				{/* Cart Icon */}
				<Link to="/cart" className="relative">
					<button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
						<ShoppingCart className="w-6 h-6 text-gray-700" />
						<span className="font-medium">Cart</span>
					</button>
					{cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
						<span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
							{cart.reduce((sum, item) => sum + item.quantity, 0)}
						</span>
					)}
				</Link>

				{/* User Greeting and Logout */}
				{user ? (
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-700">
							Hi, {user.fullName!}
						</span>
						<button
							onClick={logout}
							className="px-4 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
						>
							Logout
						</button>
					</div>
				) : (
					<Link
						to="/auth"
						className="px-4 py-2 text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all"
					>
						Login/Register
					</Link>
				)}
			</div>
		</div>
	);
};

export default FilterSection;
