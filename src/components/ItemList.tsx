import React from "react";
import { dummyData, dummyDataMembership } from "../helpet";
import { Minus, Plus } from "lucide-react";
import { useApp } from "../contexts/AppContext";

interface ItemListProps {
	activeTab: string;
}

const ItemList: React.FC<ItemListProps> = ({ activeTab }) => {
	const { filters, sortKey, cart, addToCart, removeFromCart } = useApp();

	const { brand, size } = filters;

	// Filter and sort the data
	const filteredItems =
		activeTab === "Filters"
			? dummyData
			: dummyDataMembership
					.filter((item) => (brand ? item.brand === brand : true))
					.filter((item) => (size ? item.size === size : true))
					.sort((a, b) => {
						if (sortKey === "priceAsc") return a.price - b.price;
						if (sortKey === "priceDesc") return b.price - a.price;
						return 0; // No sorting
					});

	const getItemQuantity = (itemId: string) => {
		const cartItem = cart.find(
			(item) => item.item.id.toString() === itemId
		);
		return cartItem?.quantity || 0;
	};

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6">
			<div className="grid grid-cols-1 gap-4 sm:gap-8">
				{filteredItems.map((item) => {
					const quantity = getItemQuantity(item.id.toString());
					return (
						<div
							key={item.id}
							className="flex flex-col sm:flex-row items-center border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden group gap-4 sm:gap-8 p-4 sm:p-6"
						>
							<div className="w-full sm:w-[200px] md:w-[300px] h-[200px] sm:h-[300px] rounded-xl overflow-hidden bg-gray-50">
								<img
									src={item.imageUrl}
									alt={item.name}
									className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
								/>
							</div>

							<div className="flex-1 w-full">
								<div className="space-y-4 sm:space-y-6">
									<h3 className="text-xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
										{item.name}
									</h3>
									<div className="flex items-center gap-3">
										<span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 text-gray-900 rounded-lg text-sm sm:text-base font-medium">
											Size: {item.size}
										</span>
									</div>
									<p className="text-2xl sm:text-4xl font-bold text-gray-900">
										${item.price.toFixed(2)}
									</p>
									{quantity === 0 ? (
										<button
											onClick={() => addToCart(item)}
											className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 active:bg-gray-950 transition-colors text-base sm:text-lg font-medium"
										>
											Add to Cart
										</button>
									) : (
										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													removeFromCart(
														item.id.toString()
													)
												}
												className="p-2 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
											>
												<Minus className="w-4 h-4 sm:w-5 sm:h-5" />
											</button>
											<span className="w-8 text-center text-lg">
												{quantity}
											</span>
											<button
												onClick={() => addToCart(item)}
												className="p-2 sm:px-4 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
											>
												<Plus className="w-4 h-4 sm:w-5 sm:h-5" />
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ItemList;
