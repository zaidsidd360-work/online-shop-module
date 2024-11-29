import React, { useState, useRef, useEffect } from "react";

interface TabsProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
	const [bgStyles, setBgStyles] = useState({ left: 0, width: 0 });
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const tabs = ["Filters", "Memberships", "Heating & Cooling Estimate"];

	useEffect(() => {
		const activeTabIndex = tabs.indexOf(activeTab);
		const activeTabElement = tabRefs.current[activeTabIndex];

		if (activeTabElement) {
			setBgStyles({
				left: activeTabElement.offsetLeft,
				width: activeTabElement.offsetWidth,
			});
		}
	}, [activeTab]);

	return (
		<div className="bg-white border-b border-gray-100">
			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="relative flex items-center overflow-x-auto scrollbar-hide">
					{/* Animated Background */}
					<div
						className="absolute h-full transition-all duration-300 ease-out"
						style={{
							left: bgStyles.left,
							width: bgStyles.width,
						}}
					>
						<div className="h-full w-full bg-blue-200 rounded-lg" />
					</div>

					{/* Tabs */}
					{tabs.map((tab, index) => (
						<button
							key={tab}
							ref={(el) => (tabRefs.current[index] = el)}
							onClick={() => onTabChange(tab)}
							className={`whitespace-nowrap px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium relative z-10 transition-colors ${
								activeTab === tab
									? "text-gray-800"
									: "text-gray-600 hover:text-gray-900"
							}`}
						>
							{tab}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Tabs;
