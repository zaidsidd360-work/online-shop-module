import React from "react";
import FilterSection from "./FilterSection";
import ItemList from "./ItemList";
import { CartItem } from "../helpet";

interface TabContentProps {
	activeTab: string;
	filters: {
		brand: string;
		size: string;
	};
	sortKey: string;
	onFilterChange: (filters: { brand: string; size: string }) => void;
	onSortChange: (key: string) => void;
	cart: CartItem[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onAddToCart: (item: any) => void;
	onRemoveFromCart: (itemId: string, all?: boolean) => void;
}

const TabContent: React.FC<TabContentProps> = ({
	activeTab,
	filters,
	sortKey,
	onFilterChange,
	onSortChange,
	cart,
	onAddToCart,
	onRemoveFromCart,
}) => {
	const renderTabContent = () => {
		switch (activeTab) {
			case "Filters":
				return (
					<div className="p-6">
						<div className="sticky top-4 z-10">
							<FilterSection
								onFilterChange={onFilterChange}
								onSortChange={onSortChange}
								cartItemCount={cart.reduce(
									(sum, item) => sum + item.quantity,
									0
								)}
								activeTab={activeTab}
							/>
						</div>
						<ItemList
							cart={cart}
							onAddToCart={onAddToCart}
							onRemoveFromCart={onRemoveFromCart}
							filters={filters}
							sortKey={sortKey}
							activeTab={activeTab}
						/>
					</div>
				);
			case "Memberships":
				return (
					<div className="p-6">
						<div className="sticky top-4 z-10">
							<FilterSection
								onFilterChange={onFilterChange}
								onSortChange={onSortChange}
								cartItemCount={cart.reduce(
									(sum, item) => sum + item.quantity,
									0
								)}
								activeTab={activeTab}
							/>
						</div>
						<ItemList
							cart={cart}
							onAddToCart={onAddToCart}
							onRemoveFromCart={onRemoveFromCart}
							filters={filters}
							sortKey={sortKey}
							activeTab={activeTab}
						/>
					</div>
				);
			case "Heating & Cooling Estimate":
				return <div className="p-6"> Hello</div>;
			default:
				return null;
		}
	};

	return renderTabContent();
};

export default TabContent;
