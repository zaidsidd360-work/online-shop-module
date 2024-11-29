import React from "react";
import FilterSection from "./FilterSection";
import ItemList from "./ItemList";
import { CartItem } from "../helpet";
import MultiStepForm from "./MultiStepForm";

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
							/>
						</div>
						<ItemList
							cart={cart}
							onAddToCart={onAddToCart}
							onRemoveFromCart={onRemoveFromCart}
							filters={filters}
							sortKey={sortKey}
						/>
					</div>
				);
			case "Memberships":
				return (
					<div className="p-6">
						<h2>Memberships Content</h2>
					</div>
				);
			case "Heating & Cooling Estimate":
				return <div className="p-6">{/* <MultiStepForm /> */}</div>;
			default:
				return null;
		}
	};

	return renderTabContent();
};

export default TabContent;
