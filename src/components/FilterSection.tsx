import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FilterSectionProps {
	onFilterChange: (filters: { brand: string; size: string }) => void;
	onSortChange: (key: string) => void;
	cartItemCount: number;
	activeTab: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
	onFilterChange,
	onSortChange,
	cartItemCount,
	activeTab,
}) => {
	const [brand, setBrand] = useState("");
	const [size, setSize] = useState("");

	const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newBrand = e.target.value;
		setBrand(newBrand);
		onFilterChange({ brand: newBrand, size });
	};

	const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSize = e.target.value;
		setSize(newSize);
		onFilterChange({ brand, size: newSize });
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSortChange(e.target.value);
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-300 max-w-6xl mx-auto mb-4 sm:mb-8 gap-4">
			{/* Filters Section */}
			{activeTab === "Filters" && (
				<div className="flex flex-wrap sm:flex-row gap-4 sm:gap-6 items-center">
					{/* Brand Filter */}
					<select
						value={brand}
						onChange={handleBrandChange}
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
						value={size}
						onChange={handleSizeChange}
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
			)}

			{/* Sort & Cart Section */}
			<div className="flex flex-row gap-6 items-center">
				{/* Sort Options */}
				<select
					onChange={handleSortChange}
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
					{cartItemCount > 0 && (
						<span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
							{cartItemCount}
						</span>
					)}
				</Link>
			</div>
		</div>
	);
};

export default FilterSection;
