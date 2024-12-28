import React from "react";
import FilterSection from "./FilterSection";
import ItemList from "./ItemList";

interface TabContentProps {
	activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
	const renderTabContent = () => {
		switch (activeTab) {
			case "Filters":
				return (
					<div className="p-6">
						<div className="sticky top-4 z-10">
							<FilterSection />
						</div>
						<ItemList activeTab={activeTab} />
					</div>
				);
			case "Memberships":
				return (
					<div className="p-6">
						<div className="sticky top-4 z-10">
							<FilterSection />
						</div>
						<ItemList activeTab={activeTab} />
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
