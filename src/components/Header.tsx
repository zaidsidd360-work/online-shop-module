import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
	return (
		<header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
			<Link
				to="/"
				className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
			>
				Online Store
			</Link>
			{/* <Link
				to="/cart"
				className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-full hover:bg-gray-100 transition-all relative"
			>
				<ShoppingCart className="w-5 h-5" />
				<span className="font-medium">Cart</span>
				{cartItemCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
						{cartItemCount}
					</span>
				)}
			</Link> */}
		</header>
	);
};

export default Header;
