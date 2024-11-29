import React, { useState } from "react";

interface FilterSectionProps {
	onFilterChange: (filters: { brand: string; size: string }) => void;
	onSortChange: (key: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
	onFilterChange,
	onSortChange,
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
		<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-300 max-w-6xl mx-auto mb-4 sm:mb-8 gap-2 sm:gap-4">
			<div className="flex flex-row gap-2 sm:gap-4 w-full sm:w-auto">
				{/* Brand Filter */}
				<select
					value={brand}
					onChange={handleBrandChange}
					className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
				>
					<option value="">All Brands</option>
					<option value="Honeywell">Honeywell</option>
					<option value="3M">3M</option>
					<option value="Nordic Pure">Nordic Pure</option>
					<option value="FilterBuy">FilterBuy</option>
					<option value="Aerostar">Aerostar</option>
					<option value="Apex">Apex</option>
					<option value="Aqualife">Aqualife</option>
				</select>

				{/* Size Filter */}
				<select
					value={size}
					onChange={handleSizeChange}
					className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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

			{/* Sort Options */}
			<select
				onChange={handleSortChange}
				className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
			>
				<option value="">Sort By</option>
				<option value="priceAsc">Price: Low to High</option>
				<option value="priceDesc">Price: High to Low</option>
			</select>
		</div>
	);
};

export default FilterSection;
