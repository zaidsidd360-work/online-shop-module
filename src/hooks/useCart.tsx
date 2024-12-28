import { useState } from "react";

interface CartItem {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	item: any;
	quantity: number;
}

export function useCart() {
	const [cart, setCart] = useState<CartItem[]>([]);

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

	return { cart, addToCart, removeFromCart };
}
