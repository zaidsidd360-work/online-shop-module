// src/components/CountryCodeSelector.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { countryCodes } from "../../helpers/helper";

interface CountryCode {
	name: string;
	code: string;
	flag: string;
}

interface CountryCodeSelectorProps {
	onCodeSelect: (code: string) => void;
	defaultCode?: CountryCode;
}

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
	onCodeSelect,
	defaultCode = countryCodes[0],
}) => {
	const [selectedCode, setSelectedCode] = useState<CountryCode>(defaultCode);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);
	const selectedItemRef = useRef<HTMLLIElement | null>(null);

	// Toggle dropdown visibility
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	// Handle option selection
	const handleSelect = (code: CountryCode) => {
		setSelectedCode(code);
		onCodeSelect(code.code);
		setDropdownOpen(false); // Close dropdown after selection
	};

	// Handle outside click to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Scroll to the selected item when the dropdown opens
	useEffect(() => {
		if (dropdownOpen && selectedItemRef.current) {
			selectedItemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [dropdownOpen, selectedCode]);

	return (
		<div className="relative w-full max-w-xs" ref={selectRef}>
			{/* Select Button */}
			<div
				className={`flex items-center justify-between py-2 px-3 bg-white border rounded-full cursor-pointer w-[100%] md:w-[60%] ${
					dropdownOpen ? "border-gray-500" : "border-gray-300"
				}`}
				onClick={toggleDropdown}
			>
				<span className="flex items-center gap-2 text-gray-700 w-full">
					<span>{selectedCode.flag}</span>
					<span>{selectedCode.code}</span>
				</span>
				<ChevronDown
					className={`w-4 h-4 transition-transform duration-200 ${
						dropdownOpen ? "transform rotate-180" : ""
					}`}
				/>
			</div>

			{/* Dropdown Menu */}
			{dropdownOpen && (
				<ul
					className="absolute z-20 w-min mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
					role="listbox"
				>
					{countryCodes.map((code: CountryCode) => (
						<li
							key={code.code}
							className={`cursor-pointer py-2 px-4 flex items-center justify-between hover:bg-gray-50 ${
								selectedCode.code === code.code
									? "bg-gray-100"
									: ""
							}`}
							onClick={() => handleSelect(code)}
							role="option"
							aria-selected={selectedCode.code === code.code}
							ref={
								selectedCode.code === code.code
									? selectedItemRef
									: null
							} // Set ref on selected item
						>
							<span className="flex items-center space-x-2">
								<span>{code.flag}</span>
								<span>{code.name}</span>
							</span>
							<span>{code.code}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CountryCodeSelector;
