import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useApp } from "../contexts/AppContext";

const CartPage: React.FC = () => {
	const { cart, addToCart, removeFromCart } = useApp();
	const total = cart.reduce(
		(sum, { item, quantity }) => sum + item.price * quantity,
		0
	);

	if (cart.length === 0) {
		return (
			<div className="max-w-6xl mx-auto px-6 py-12">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">
						Your Cart is Empty
					</h2>
					<p className="text-gray-600 mb-8">
						Add some items to get started!
					</p>
					<Link
						to="/"
						className="inline-block px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
			<h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
				Shopping Cart
			</h2>
			<div className="grid grid-cols-1 gap-4 sm:gap-6">
				{cart.map(({ item, quantity }) => (
					<div
						key={item.id}
						className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm"
					>
						<img
							src={item.imageUrl}
							alt={item.name}
							className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
						/>
						<div className="flex-1">
							<h3 className="text-lg sm:text-xl font-semibold">
								{item.name}
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">
								Size: {item.size}
							</p>
							<p className="text-base sm:text-lg font-bold mt-2">
								${item.price.toFixed(2)}
							</p>
						</div>
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
							<div className="flex items-center gap-2">
								<button
									onClick={() =>
										removeFromCart(item.id.toString())
									}
									className="p-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
								>
									<Minus className="w-4 h-4" />
								</button>
								<span className="w-8 text-center">
									{quantity}
								</span>
								<button
									onClick={() => addToCart(item)}
									className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
								>
									<Plus className="w-4 h-4" />
								</button>
							</div>
							<button
								onClick={() =>
									removeFromCart(item.id.toString(), true)
								}
								className="flex items-center gap-2 text-red-600 hover:text-red-700"
							>
								<Trash2 className="w-4 h-4" />
								<span className="text-sm">Remove</span>
							</button>
						</div>
					</div>
				))}
			</div>
			<div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl shadow-sm">
				<div className="flex justify-between items-center text-lg sm:text-xl font-bold">
					<span>Total:</span>
					<span>${total.toFixed(2)}</span>
				</div>
				<button className="w-full mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 text-base sm:text-lg font-medium">
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
};

export default CartPage;
